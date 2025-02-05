import React, { useEffect, useState } from 'react';

function MyComponent({ shouldFetch }: { shouldFetch: boolean }) {
    const [ data, setData ] = useState(null);

    // This is incorrect: useEffect is conditionally called
    if (shouldFetch) {
        useEffect(() => {
            async function fetchData() {
                const response = await fetch('https://api.example.com/data');
                const result = await response.json();
                setData(result);
            }

            fetchData();
        }, [shouldFetch]);
    }

    return <div>{data ? JSON.stringify(data) : 'No data yet'}</div>;
}

export default MyComponent;