import React, { useEffect, useState } from 'react'
import supabase from '../supabaseClient'

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([])
  const [selectedType, setSelectedType] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')

      if (error) console.error('Error:', error)
      else setRestaurants(data)
    }

    fetchData()
  }, [])

  // 🟡 Here's the filtering logic you asked about:
  const filtered = restaurants.filter(r => 
    (selectedType === 'All' || r.type === selectedType) &&
    (selectedLocation === 'All' || r.location === selectedLocation)
  )

  return (
    <div>
      <h2>Kosher Restaurants</h2>

      {/* Example filter dropdowns */}
      <div>
        <label>Type:</label>
        <select value={selectedType} onChange={e => setSelectedType(e.target.value)}>
          <option value="All">All</option>
          <option value="Meat">Meat</option>
          <option value="Dairy">Dairy</option>
          <option value="Pareve">Pareve</option>
        </select>

        <label>Location:</label>
        <select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)}>
          <option value="All">All</option>
          <option value="Jerusalem">Jerusalem</option>
          <option value="Bnei Brak">Bnei Brak</option>
          <option value="Tel Aviv">Tel Aviv</option>
        </select>
      </div>

      <ul>
        {filtered.map(r => (
          <li key={r.id}>
            <h3>{r.name}</h3>
            <p>Type: {r.type} | Hechsher: {r.hechsher} | Location: {r.location}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RestaurantList
