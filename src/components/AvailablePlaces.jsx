import { useSyncExternalStore, useState, useEffect } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
    const [AvailablePlaces, setAvailablePlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function loadPlaces() {
            setIsLoading(true);
            const response = await fetch("http://localhost:3000/places");
            const resData = await response.json();
            setAvailablePlaces(resData.places);
            setIsLoading(false);
        }
        loadPlaces();
    }, []);

    return (
        <Places
            title="Available Places"
            places={AvailablePlaces}
            isLoading={isLoading}
            loadingText="Fetching data..."
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    );
}
