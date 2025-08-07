import React, { useState } from 'react';
import { restaurants } from './data/restaurants';
import SearchBar from './components/SearchBar';
import RestaurantList from './components/RestaurantList';
import logo from './logo.svg';
import './App.css';
import { Restaurant } from './types/restaurant';

const SORT_OPTIONS = [
  { label: 'Name', value: 'name' },
  { label: 'City', value: 'city' },
  { label: 'Cuisine', value: 'cuisine' },
];

function App() {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<keyof Restaurant>('name');
  const filtered = restaurants
    .filter(r =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(query.toLowerCase()) ||
      r.city.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => (
      a[sortBy] || '').toString().localeCompare((b[sortBy] || '').toString())
    );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Kosher Restaurants</h1>
      </header>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ padding: '1rem' }}>
          <SearchBar value={query} onChange={setQuery} />
        </div>
        <div style={{
          background: '#f9f9f9',
          borderRadius: '12px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <label style={{ marginRight: 8, fontWeight: 500 }}>Sort by:</label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as keyof Restaurant)}
              style={{
                borderRadius: 8,
                border: '1px solid #ddd',
                fontSize: '1rem',
                background: '#fff'
              }}
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <RestaurantList restaurants={filtered} />
        </div>
      </div>
    </div>
  );
}

export default App;
