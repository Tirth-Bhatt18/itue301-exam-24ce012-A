import RestaurantCard from '../components/RestaurantCard'

function RestaurantsPage({ restaurants = [] }) {
  return (
    <main className="page">
      <p className="eyebrow">Discover</p>
      <h1>Restaurants</h1>
      {restaurants.length === 0 ? (
        <p>No restaurants available yet.</p>
      ) : (
        <section className="restaurant-list" aria-label="Restaurants">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id || restaurant.name} {...restaurant} />
          ))}
        </section>
      )}
    </main>
  )
}

export default RestaurantsPage