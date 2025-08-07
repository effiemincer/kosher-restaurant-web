import React, { useEffect, useState } from 'react'
import supabase from '../supabaseClient'

enum Hechsher {
  None = 'None',
  OU = 'OU',
  Rabanut = "Rabanut",
  BeitYosef = 'Beit Yosef',
  Rubin = 'Rubin',
  YoraDeah = 'Yora Deah',
  EidaChareidis = 'Eida Chareidis',
}

enum CuisineType {
  None = 'None',
  Meat = 'Meat',
  Dairy = 'Dairy',
  Bakery = 'Bakery',
  Cafe = 'Cafe',
}

type Restaurant = {
  id: number;
  name: string;
  type: CuisineType;
  hechsher: Hechsher;
  location: string;
  menu_image_url?: string;
  hechser_image_url?: string;
};

function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
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
