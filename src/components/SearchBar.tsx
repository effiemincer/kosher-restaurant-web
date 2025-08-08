import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search restaurants..."
    value={value}
    onChange={e => onChange(e.target.value)}
    style={{
      width: '90%',
      padding: '1rem',
      fontSize: '1.2rem',
      borderRadius: '8px',
      border: '1px solid #ccc',
    }}
  />
);

export default SearchBar;