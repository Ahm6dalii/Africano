import React from 'react';
import { MapPin } from 'lucide-react';

const MapLocation = ({ translation }) => {
  return (
    <section className="w-full sm:px-6 py-8 md:py-12">
         <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-6 text-center flex items-center justify-center gap-2">
        <MapPin className="w-6 h-6" />
        <span className="font-['Oswald']">{translation?.findUs || 'Find Us'}</span>
      </h2>
      <div className="w-full rounded-lg overflow-hidden shadow-lg mb-6">
        <iframe 
          className="w-full" 
          height={300} 
          frameBorder="0" 
          scrolling="no" 
          marginHeight="0" 
          marginWidth="0" 
          id="gmap_canvas" 
          src="https://maps.google.com/maps?width=550&amp;height=306&amp;hl=en&amp;q=africano%20pizza%20ra's%20ghareb+(africano%20pizza)&amp;t=&amp;z=19&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        />
      </div>
      
    
    </section>
  );
};

export default MapLocation;