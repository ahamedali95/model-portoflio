import React from 'react';

import { Chip } from '@components/Chip';

const Header = () => {
    return (
        <header className='flex flex-row justify-between items-center flex-nowrap mt-1 mb-5'>
            <h2 className='text-2xl font-bold'>
                Stacklet 80/20 Model Portfolio
            </h2>
            <div className='flex flex-row gap-2'>
                <Chip>Tax-Advantaged</Chip>
                <Chip>Stacklet</Chip>
            </div>
        </header>
    );
};

export default Header;