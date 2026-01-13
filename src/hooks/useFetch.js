import { useState, useEffect } from "react";

export function useFetch(fetchFn, errorMsg, initialData) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [data, setData] = useState(initialData);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const data = await fetchFn();
                setData(data);
            } catch (error) {
                setError({
                    message: error.message || errorMsg,
                });
            }
            setIsLoading(false);
        }
        fetchData();
    }, [fetchFn]);

    return { isLoading, error, data, setData };
}
