import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Greeting from './Grretings';

describe('Greeting Component', () => {
    test('renders a default greeting', () => {
        render(<Greeting />);
        expect(screen.getByText('Hello, Guest!'))
            .toBeInTheDocument();
    });

    test('updates the greeting when input is provided', () => {
        render(<Greeting />);

        const input = screen.getByLabelText('name-input');
        fireEvent.change(input, { target: { value: 'Alice' }});

        expect(screen.getByText('Hello, Alice!'))
            .toBeInTheDocument();
    });

    test('updates the greeting when input is provided', () => {
        render(<Greeting />);

        const input = screen.getByLabelText('name-input');
        fireEvent.change(input, { target: { value: 'Alice' }});
        fireEvent.change(input, { target: { value: '' }});

        expect(screen.getByText('Hello, Guest!'))
            .toBeInTheDocument();
    });
});