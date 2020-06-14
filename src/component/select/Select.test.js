import React from 'react';
import { render } from '@testing-library/react';
import {Select} from './Select';

test('renders learn react link', () => {
    const options = [1, 2];
    const onSelectedOption = () => { };
    const { findAllByText } = render(<Select
        options={options}
        selectedOption={options[0]}
        onSelectedOption={onSelectedOption}
    />);

});