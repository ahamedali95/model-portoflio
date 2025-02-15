import React, { useState } from 'react';

const Greeting = () => {
    const [ name, setName ] = useState('');
    const handleChange = (e: any) => {
        setName(e.target.value);
    };

    return (
        <div>
            <h1>Hello, {name || 'Guest'}!</h1>
            <input
                aria-label='name-input'
                onChange={handleChange}
                placeholder='Enter your name'
                type='text'
                value={name}
            />
        </div>
    );
};

export default Greeting;