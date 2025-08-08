import React from 'react';
import { Restaurant } from '../types/restaurant';

interface Props {
  restaurants: Restaurant[];
}

const RestaurantList: React.FC<Props> = ({ restaurants }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
    {restaurants.map(r => (
      <div
        key={r.id}
        style={{
          borderRadius: '12px',
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          padding: '1.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{r.name}</div>
        <div style={{ color: '#64748b', fontSize: '1rem' }}>{r.cuisine} • {r.city}</div>
        <div style={{ color: '#64748b', fontSize: '0.95rem' }}>{r.address}</div>
        {r.hechsher && (
          <div style={{ fontSize: '0.9rem', color: '#22c55e', fontWeight: 500 }}>
            Hechsher: {r.hechsher}
          </div>
        )}
        {r.website && (
          <a
            href={r.website}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: '0.5rem',
              color: '#2563eb',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.95rem'
            }}
          >
            Visit Website
          </a>
        )}
      </div>
    ))}
  </div>
);

export default RestaurantList;