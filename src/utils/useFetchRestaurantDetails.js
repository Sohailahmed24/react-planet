import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchRestaurantDetails = (url, payload, headers) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.post(url, payload, { headers });
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, payload, headers]);

    return { data, loading, error, refetch: () => fetchData() };
};

export default useFetchRestaurantDetails;
 