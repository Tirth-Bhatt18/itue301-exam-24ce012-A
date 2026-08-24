# QuickBite Food Ordering System

QuickBite is a React, Express, and MongoDB food ordering application for the ITUE301 Advanced Web Development Frameworks practical examination.

## Setup

Install dependencies:

```bash
npm install
npm install --prefix backend
```

Create `.env` in the project root from `.env.example`. Set `MONGO_URI` to your MongoDB Atlas connection string and `PORT=5000`. Set `ADMIN_EMAIL` to the email used for the admin login. The backend also accepts the existing `DB_STRING` variable.

In MongoDB Atlas, create a database user, allow your development IP address, and use collections named `Customer`, `Restaurant`, and `Order`.

## Run

Backend:

```bash
cd backend
npm start
```

Frontend, in a second terminal:

```bash
npm run dev
```

The Vite server proxies `/api` requests to `http://localhost:5000`.

## API Endpoints

- `POST /api/v1/auth/login`
- `GET /api/v1/restaurants`
- `POST /api/v1/orders` (Bearer token required)
- `GET /api/v1/orders` (Bearer token required)
- `PATCH /api/v1/orders/:id/status` (Bearer token required)

Admin restaurant operations use `POST`, `PATCH /api/v1/restaurants/:id`, and `DELETE /api/v1/restaurants/:id` with the admin Bearer token.

## Checks

```bash
npm run build
npm run lint
```