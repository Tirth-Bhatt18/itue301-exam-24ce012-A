import { useEffect, useState } from 'react'
import RestaurantCard from '../components/RestaurantCard'

function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/v1/restaurants')
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load restaurants')
        return response.json()
      })
      .then((data) => setRestaurants(data))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [])

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const searchText = search.toLowerCase()
    return restaurant.name.toLowerCase().includes(searchText)
      || restaurant.cuisine.toLowerCase().includes(searchText)
  })

  return (
    <main className="page">
      <p className="eyebrow">Discover</p>
      <h1>Restaurants</h1>
      <label>
        Search restaurants
        <input value={search} onChange={(event) => setSearch(event.target.value)} />
      </label>
      {loading ? (
        <p>Loading restaurants...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : filteredRestaurants.length === 0 ? (
        <p>No restaurants available yet.</p>
      ) : (
        <section className="restaurant-list" aria-label="Restaurants">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id || restaurant.name} {...restaurant} />
          ))}
        </section>
      )}
    </main>
  )
}

export default RestaurantsPage