import { useSyncExternalStore, useState, useEffect } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
    const [AvailablePlaces, setAvailablePlaces] = useState([]);

    useEffect(() => {
        async function loadPlaces() {
            const response = await fetch("http://localhost:3000/places");
            const resData = await response.json();
            setAvailablePlaces(resData.places);
        }
        loadPlaces();
    }, []);

    return (
        <Places
            title="Available Places"
            places={AvailablePlaces}
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    );
}
