// components/RestaurantCard.tsx
import React from 'react'

type Restaurant = {
  id: string
  name: string
  type: string
  location: string
  hechsher: string
  menu_image_url?: string
}

const RestaurantCard: React.FC<{ restaurant: Restaurant }> = ({ restaurant }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 border hover:border-gray-300 transition">
      <h2 className="text-lg font-bold">{restaurant.name}</h2>
      <p className="text-sm text-gray-600">{restaurant.type} – {restaurant.location}</p>
      <p className="text-sm text-gray-500">Hechsher: {restaurant.hechsher}</p>
      {restaurant.menu_image_url && (
        <img
          src={restaurant.menu_image_url}
          alt="Menu"
          className="mt-2 rounded w-full object-cover max-h-40"
        />
      )}
    </div>
  )
}

export default RestaurantCard