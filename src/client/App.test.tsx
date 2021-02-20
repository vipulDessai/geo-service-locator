import React from 'react';
import { render, screen } from '@testing-library/react';

import { App } from '@/client/App';

describe('Render', () => {
    test('App',  () => {
        render(
            <App />
        );

        expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
    });
});