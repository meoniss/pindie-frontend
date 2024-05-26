import { useState, useEffect } from 'react';
import { getNormalizedGamesDataByCategory } from './api-utils';

export const useGetDataByCategory = (endpoint, category) => {
    const [data, setData] = useState(nul);
    useEffect(() => {
        async function fetchData() {
            const data = await getNormalizedGamesDataByCategory(endpoint, category);
            setData(data);
        }
        fetchData(data);
    }, []);
    return data;
};