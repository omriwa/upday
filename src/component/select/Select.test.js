import React from 'react';
import { render } from '@testing-library/react';
import {Select} from './Select';

test('renders select', () => {
    const options = [1, 2];
    let selectedOption = options[0];
    const onSelectedOption = e => console.log(e);
    const {container} = render(<Select
        options={options}
        selectedOption={selectedOption}
        onSelectedOption={onSelectedOption}
    />);
    
    container.querySelectorAll('option').forEach((option, index) => {
        expect(option.value === options[index]);
    });
    expect(container.querySelector('select').value === options[0] + '').toBeTruthy();
});