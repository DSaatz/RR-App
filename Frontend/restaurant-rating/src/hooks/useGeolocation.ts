// hooks/useGeolocation.ts
import { useEffect, useState } from 'react';

interface Location {
    latitude: number | null;
    longitude: number | null;
}

interface GeolocationError {
    message: string;
}

const useGeolocation = () => {
    const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });
    const [error, setError] = useState<GeolocationError | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError({ message: "Geolocation is not supported by your browser." });
            return;
        }

        const success = (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            // Store location in localStorage
            localStorage.setItem('geolocation', JSON.stringify({ latitude, longitude }));
        };

        const failure = (err: GeolocationPositionError) => {
            setError({ message: err.message });
        };

        navigator.geolocation.getCurrentPosition(success, failure);
    }, []);

    return { location, error };
};

export default useGeolocation;
