import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ProtectedRoute from './components/ProtectedRoute'
import AuthProvider from './context/AuthProvider'
import HomePage from './pages/HomePage'
import OrderPage from './pages/OrderPage'
import RestaurantsPage from './pages/RestaurantsPage'
import './App.css'

const AdminPanel = lazy(() => import('./pages/AdminPanel'))

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <OrderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<p>Loading admin panel...</p>}>
                <AdminPanel />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
