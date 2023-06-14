import React, { useEffect, useState } from 'react';

const LocationPermission = () => {
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    const requestLocationPermission = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationData({ latitude, longitude });
        },
        (error) => {
          console.error(error);
        }
      );
    };

    requestLocationPermission();
  }, []);

  if (!locationData) {
    // Si locationData es null, mostrar un mensaje de carga o algo similar
    return <div>Cargando ubicación...</div>;
  }

  return (
    <React.Fragment>
      Latitude: {locationData?.latitude}, Longitude: {locationData?.longitude}
    </React.Fragment>
  );
};

export default LocationPermission;