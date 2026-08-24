import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import connectDatabase from './config/database.js'
import Restaurant from './models/Restaurant.js'

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(currentDirectory, '../.env') })

await connectDatabase()
await Restaurant.deleteMany({})
await Restaurant.insertMany([
  {
    name: 'Spice Route', cuisine: 'Indian', rating: 4.7, isOpen: true,
    menu: [{ name: 'Paneer Tikka', price: 220 }, { name: 'Butter Naan', price: 60 }],
  },
  {
    name: 'Green Bowl', cuisine: 'Healthy', rating: 4.4, isOpen: true,
    menu: [{ name: 'Quinoa Bowl', price: 280 }, { name: 'Fresh Lemonade', price: 90 }],
  },
  {
    name: 'Pasta Corner', cuisine: 'Italian', rating: 4.2, isOpen: false,
    menu: [{ name: 'Arrabbiata Pasta', price: 240 }, { name: 'Garlic Bread', price: 120 }],
  },
])
console.log('Sample restaurants inserted')
await import('mongoose').then(({ default: mongoose }) => mongoose.disconnect())