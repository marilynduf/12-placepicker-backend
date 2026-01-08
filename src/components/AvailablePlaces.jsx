import { useSyncExternalStore, useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {
    const [AvailablePlaces, setAvailablePlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function loadPlaces() {
            setIsLoading(true);
            try {
                const response = await fetch("http://localhost:3000/places");
                const resData = await response.json();

                if (!response.ok) {
                    throw new Error("Failed to fetch places");
                }

                navigator.geolocation.getCurrentPosition((position) => {
                    const sortedPlaces = sortPlacesByDistance(
                        resData.places,
                        position.coords.latitude,
                        position.coords.longitude
                    );
                    setAvailablePlaces(sortedPlaces);
                });
            } catch (error) {
                setError({
                    message:
                        error.message ||
                        "Could not fetch places, please try again later",
                });
            }
            setIsLoading(false);
        }
        loadPlaces();
    }, []);

    if (error) {
        return <Error title="An errror occurred" message={error.message} />;
    }

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
