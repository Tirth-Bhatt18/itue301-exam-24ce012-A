import mongoose from 'mongoose'

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    rating: { type: Number },
    isOpen: { type: Boolean, default: true },
    menu: {
      type: [
        {
          name: { type: String, required: true },
          price: { type: Number, required: true, min: 0 },
          description: { type: String },
        },
      ],
      default: [],
    },
  },
  { collection: 'Restaurant' },
)

const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema)

export default Restaurant