# Assignment 3: Inventory and Data Management System

A RESTful inventory backend built to match the supplied Web Dev III Assignment 3 brief. It uses Node.js, Express, MongoDB, Mongoose and dotenv. Nodemon is included as a development tool for automatic restarts.

## Requirements

- Node.js (LTS recommended) and npm
- MongoDB Community Server running locally, OR a MongoDB Atlas cluster
- Postman (optional, for API testing)

Node.js and MongoDB are system applications and are not bundled inside this ZIP. Install them using the official websites:
- Node.js: https://nodejs.org/
- MongoDB Community Server: https://www.mongodb.com/try/download/community
- MongoDB Compass (optional GUI): https://www.mongodb.com/products/tools/compass

## Setup on Windows

1. Extract this ZIP.
2. Open the extracted `Inventory_Data_Management_System` folder in VS Code.
3. Open Terminal > New Terminal.
4. Install packages:

   ```cmd
   npm install
   ```

5. Create your local environment file by copying `.env.example` to `.env`:

   ```cmd
   copy .env.example .env
   ```

6. If MongoDB Community Server is installed and running locally, the default `.env` connection is:

   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/inventoryDB
   PORT=5000
   NODE_ENV=development
   ```

   For MongoDB Atlas, replace `MONGO_URI` with your own Atlas connection string. Do not share or commit your `.env` file.

7. Start MongoDB if it is not already running. On Windows, MongoDB is commonly installed as a Windows service. You can check Services for `MongoDB Server`.
8. Start the API:

   ```cmd
   npm run dev
   ```

   Or run once without nodemon:

   ```cmd
   npm start
   ```

9. Open `http://localhost:5000/`. You should receive an API welcome response.

## API endpoints

Base URL: `http://localhost:5000`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | API welcome |
| POST | `/api/products` | Create product |
| GET | `/api/products` | List, filter, sort and paginate products |
| GET | `/api/products/:id` | Get one product |
| PUT | `/api/products/:id` | Update product details |
| PATCH | `/api/products/:id/stock` | Restock or record a sale |
| DELETE | `/api/products/:id` | Delete product |
| GET | `/api/products/low-stock` | Low-stock report |
| GET | `/api/products/summary` | Category-wise inventory aggregation |

## Example requests

### Create a product

POST `http://localhost:5000/api/products`

Header: `Content-Type: application/json`

```json
{
  "name": "Gel Pen Pack of 15",
  "sku": "STNY-PN-713",
  "category": "Stationery",
  "price": 120,
  "quantity": 40,
  "reorderLevel": 20,
  "supplier": "Cello Pens"
}
```

### List, filter, sort and paginate

GET `http://localhost:5000/api/products?page=1&limit=10`

Other query examples:

- `?category=Stationery`
- `?search=pen`
- `?minPrice=50&maxPrice=500`
- `?sort=price&order=asc`
- Combine them: `?category=Stationery&sort=price&order=desc&page=1&limit=5`

Allowed sort fields: `name`, `price`, `quantity`, `category`, `createdAt`, `updatedAt`. Page size is limited to 100.

### Get one product

GET `http://localhost:5000/api/products/PRODUCT_ID`

### Update product

PUT `http://localhost:5000/api/products/PRODUCT_ID`

```json
{
  "price": 140,
  "quantity": 60
}
```

### Restock or record a sale

PATCH `http://localhost:5000/api/products/PRODUCT_ID/stock`

Restock by 10:

```json
{ "change": 10 }
```

Record a sale of 3:

```json
{ "change": -3 }
```

A sale that would make stock negative is rejected.

### Delete product

DELETE `http://localhost:5000/api/products/PRODUCT_ID`

### Low-stock report

GET `http://localhost:5000/api/products/low-stock`

Products whose `quantity` is less than or equal to `reorderLevel` are returned.

### Category-wise summary

GET `http://localhost:5000/api/products/summary`

Uses a MongoDB aggregation pipeline to calculate item count, total quantity, total stock value and average price for each category.

## Validation and error handling

- Required fields: `name`, `sku`, `category`, `price`, `quantity`
- SKU is unique and stored uppercase.
- Price and quantity cannot be negative.
- Quantity and reorder level must be whole numbers.
- Mongoose validation runs on create and update.
- Duplicate SKU, invalid ID, validation and unknown-route errors return readable JSON responses.
- `stockValue` is a virtual field calculated as `price * quantity`.

## Included folders

- `config/` - MongoDB connection
- `controllers/` - API business logic
- `middleware/` - async wrapper and centralized error handler
- `models/` - Mongoose Product schema
- `routes/` - Express product routes

## Notes

- The ZIP contains source code and setup instructions, not a copy of Node.js or the MongoDB server installer.
- `node_modules` is intentionally excluded; run `npm install` after extracting the project.
- Never upload `.env` or database credentials to GitHub.
