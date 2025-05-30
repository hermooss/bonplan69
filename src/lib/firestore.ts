import { collection, DocumentData, onSnapshot, query, Unsubscribe } from 'firebase/firestore';
import { db } from '../firebase';

interface RetryConfig {
  maxAttempts: number;
  initialDelay: number;
  maxDelay: number;
  backoffFactor: number;
}

const defaultRetryConfig: RetryConfig = {
  maxAttempts: 5,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffFactor: 2
};

/**
 * Gère les erreurs de connexion Firestore avec retry logic
 */
export class FirestoreError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'FirestoreError';
  }
}

/**
 * Attends un délai exponentiel entre les tentatives
 */
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Calcule le délai de retry avec backoff exponentiel
 */
const calculateDelay = (attempt: number, config: RetryConfig): number => {
  const delay = Math.min(
    config.initialDelay * Math.pow(config.backoffFactor, attempt),
    config.maxDelay
  );
  return delay + Math.random() * 1000; // Ajoute un jitter aléatoire
};

/**
 * Écoute une collection Firestore avec retry logic
 */
export const listenToCollection = <T = DocumentData>(
  collectionPath: string,
  onData: (data: T[]) => void,
  onError?: (error: FirestoreError) => void,
  retryConfig: Partial<RetryConfig> = {}
): Unsubscribe => {
  const config = { ...defaultRetryConfig, ...retryConfig };
  let attempt = 0;
  let unsubscribe: Unsubscribe | null = null;

  const setupListener = () => {
    try {
      const q = query(collection(db, collectionPath));
      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as T[];
          onData(data);
          // Réinitialise le compteur de tentatives en cas de succès
          attempt = 0;
        },
        async (error) => {
          console.error('Firestore listen error:', error);
          
          if (attempt < config.maxAttempts) {
            const delay = calculateDelay(attempt, config);
            console.log(`Retrying in ${delay}ms (attempt ${attempt + 1}/${config.maxAttempts})`);
            
            await wait(delay);
            attempt++;
            setupListener();
          } else {
            const firestoreError = new FirestoreError(
              'Failed to establish Firestore connection',
              error.code,
              error
            );
            onError?.(firestoreError);
          }
        }
      );
    } catch (error) {
      console.error('Error setting up Firestore listener:', error);
      onError?.(new FirestoreError(
        'Failed to setup Firestore listener',
        'setup-error',
        error
      ));
    }
  };

  setupListener();

  // Retourne une fonction de nettoyage
  return () => {
    if (unsubscribe) {
      unsubscribe();
    }
  };
};

/**
 * Exemple d'utilisation :
 * 
 * const unsubscribe = listenToCollection(
 *   'products',
 *   (products) => {
 *     console.log('Products updated:', products);
 *   },
 *   (error) => {
 *     console.error('Error:', error.message);
 *   }
 * );
 * 
 * // Pour arrêter l'écoute
 * unsubscribe();
 */ 