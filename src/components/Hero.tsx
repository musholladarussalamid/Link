import Image from 'next/image';
import React from 'react'


const Hero = () => {
  const env = process.env.NODE_ENV === 'production';
  const link = env ? '/Link' : '';

  return (
    <div className="max-container">
      <div className="flex p-4 justify-center">
        <div className="w-[300px] h-[300px] rounded-full overflow-hidden ring-4 ring-gray-200 shadow-md">
          <Image
            priority
            width={300}
            height={300}
            className="w-full h-full object-cover"
            src={link + "/logo_masjid_darussalam.jpeg"}
            alt="Logo Masjid Darussalam"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero