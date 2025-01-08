import React, { useState } from 'react';

const SearchBar = ({ setFilterPokemon }) => {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (event) => {
        const newValue = event.target.value.trim();

        setFilterPokemon(newValue);
        setInputValue(newValue);
    }

    return (
        <input 
            type="text"
            placeholder="Search Pokemon"
            value={inputValue}
            onChange={(event) => handleChange(event)}
        />
    )
};

export default SearchBar;
