import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { MapPin } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';

const LocationSection: React.FC = () => {
  const [location, setLocation] = useState<{ link: string } | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'locations'), orderBy('timestamp', 'desc'), limit(1));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const latestLocation = snapshot.docs[0].data() as { link: string };
        setLocation(latestLocation);
      } else {
        setLocation(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!location) return null;

  return (
    <section className="py-8 bg-light">
      <div className="container-custom">
        <h2 className="section-title text-center mb-6">Où nous trouver aujourd'hui ?</h2>
        <div className="flex justify-center">
          <a
            href={location.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary flex items-center gap-2 text-base sm:text-lg"
          >
            <MapPin size={20} />
            📍 Me localiser maintenant
          </a>
        </div>
      </div>
    </section>
  );
};

export default LocationSection; 