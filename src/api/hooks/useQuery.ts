import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

const useQuery = <T>(url: string, lazyFetch: boolean = false, config: AxiosRequestConfig = {}) => {
    const [ data, setData ] = useState<T | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);

    const fetch = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(url, {
                headers: { 'Content-Type': 'application/json' },
                ...config
            });

            setIsLoading(false);
            setData(response.data);
            setError(null);
        } catch (error: any) {
            setIsLoading(false);
            setData(null);
            setError(error.message);
        }
    };

    useEffect(() => {
        if (!lazyFetch) {
            fetch();
        }
    }, [url]);

    return {
        data,
        isLoading,
        error,
        fetch
    };
};

export default useQuery;