import React, { memo, useState } from 'react';

export const Select = memo((props) => {
    const { options, selectedOption: propSelectedOption, onOptionChange } = props;
    const [selectedOption, setSelectedOption] = useState(propSelectedOption);

    const onChangeHandler = e => {
        const value = e.target.value;

        setSelectedOption(value);
        onOptionChange(value);
    }
    const selectedStyle = {
        backgroundColor: 'blue'
    }

    return <div>
        <select
            value={selectedOption}
            onChange={onChangeHandler}
        >
            {
                !options ? [] : options.map(o => <option
                    key={o}
                    value={o}
                    defaultValue={selectedOption === o}
                    style={selectedOption === o ? selectedStyle : null}
                >
                    {o}
                </option>)
            }
        </select>
    </div>
});