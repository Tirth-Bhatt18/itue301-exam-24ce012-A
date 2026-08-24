import mongoose from 'mongoose'

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    rating: { type: Number },
    isOpen: { type: Boolean, default: true },
  },
  { collection: 'Restaurant' },
)

const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema)

export default Restaurant