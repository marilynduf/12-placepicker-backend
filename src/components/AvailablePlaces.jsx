import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.js";
import Places from "./Places.jsx";
import Error from "./Error.jsx";

async function getSortedPlaces() {
    const places = await fetchAvailablePlaces();
    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition((position) => {
            const sortedPlaces = sortPlacesByDistance(
                places,
                position.coords.latitude,
                position.coords.longitude
            );
            resolve(sortedPlaces);
        });
    });
}

export default function AvailablePlaces({ onSelectPlace }) {
    const errorMsg = "Could not fetch places, please try again later";

    const {
        isLoading,
        error,
        data: availablePlaces,
    } = useFetch(getSortedPlaces, errorMsg, []);

    getSortedPlaces();

    if (error) {
        return <Error title="An errror occurred" message={error.message} />;
    }

    return (
        <Places
            title="Available Places"
            places={availablePlaces}
            isLoading={isLoading}
            loadingText="Fetching data..."
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    );
}
