function RestaurantCard({ name, cuisine, rating, isOpen }) {
  return (
    <article className="restaurant-card">
      <h3>{name}</h3>
      <p>Cuisine: {cuisine}</p>
      <p>Rating: {rating}</p>
      <p className={isOpen ? 'restaurant-open' : 'restaurant-closed'}>
        {isOpen ? 'Open Now' : 'Closed'}
      </p>
    </article>
  )
}

export default RestaurantCard