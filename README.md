# 🚀 API Response Handler


A lightweight, highly robust, and standardized API response handler for **Node.js** and **Express** applications. It effortlessly guarantees a clean, consistent, and predictable response structure across your entire API architecture.

---

## ✨ Features

- 💎 **Standardized Format:** Uniform success, error, and paginated responses.
- ⚡ **Lightweight & Fast:** Zero external runtime dependencies.
- 📈 **Smart Pagination:** Built-in calculation for pages, limits, total items, and next/prev status indicators.
- 🛡️ **TypeScript Ready:** Full type definitions out of the box with `IApiResponse`.
- 🎛️ **Extremely Flexible:** Custom metadata and dynamic error payloads supported.

---

## ⚙️ Requirements

- **Runtime:** Node.js `>= 12.0.0` (Works in almost any modern Node environment)
- **Development & Testing:** Node.js `>= 18.0.0` (Required for the native `node:test` suite)

---

## 📦 Installation

Install the package via your favorite package manager:

```bash
# Using npm
npm install standard-api-response-handler

# Using yarn
yarn add standard-api-response-handler

# Using pnpm
pnpm add standard-api-response-handler
```

---

## 🛠️ Quick Start & Usage

### 1. Standard Success Response
Quickly send successful responses with data, optional custom messages, and custom HTTP status codes (defaults to `200`).

```javascript
const ApiResponse = require('standard-api-response-handler').default;

app.get('/api/users/:id', async (req, res) => {
  const user = { id: 42, username: 'dev_hero' };
  
  // Sends a standard 200 OK response
  return ApiResponse.success(res, user, 'User profile fetched successfully');
});
```

*Response Payload:*
```json
{
  "success": true,
  "status": 200,
  "message": "User profile fetched successfully",
  "data": {
    "id": 42,
    "username": "dev_hero"
  }
}
```

---

### 2. Robust Error Response
Consistently catch and format error responses. Supports custom HTTP status codes (defaults to `500`) and optional validation/error payload arrays.

```javascript
const ApiResponse = require('standard-api-response-handler').default;

app.post('/api/register', (req, res) => {
  const errors = { email: 'Email address is invalid' };
  
  // Sends a standard 400 Bad Request with details
  return ApiResponse.error(res, 'Validation failed', 400, errors);
});
```

*Response Payload:*
```json
{
  "success": false,
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "email": "Email address is invalid"
  }
}
```

---

### 3. Smart Paginated Response
Pass your raw data array and pagination metrics, and let the handler auto-calculate all structural parameters (total pages, current page, limits, and next/prev page flags).

```javascript
const ApiResponse = require('standard-api-response-handler').default;

app.get('/api/products', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  
  const { products, totalCount } = await db.products.findAndCount({ page, limit });
  
  // Auto-calculates metadata and sends pagination
  return ApiResponse.paginate(res, products, page, limit, totalCount, 'Products retrieved successfully');
});
```

*Response Payload:*
```json
{
  "success": true,
  "status": 200,
  "message": "Products retrieved successfully",
  "data": [
    { "id": 1, "name": "Premium Keyboard" },
    { "id": 2, "name": "Ergonomic Mouse" }
  ],
  "meta": {
    "currentPage": 1,
    "itemsPerPage": 10,
    "totalItems": 45,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

### 4. 🦕 TypeScript Usage
Fully compatible with TypeScript projects out-of-the-box. Import the helper class and leverage standard typings.

```typescript
import ApiResponse, { IApiResponse } from 'standard-api-response-handler';
import { Request, Response } from 'express';

interface User {
  id: number;
  email: string;
}

export const getUserProfile = (req: Request, res: Response) => {
  const user: User = { id: 1, email: 'admin@dev.io' };
  
  // Fully typed method signatures
  return ApiResponse.success(res, user, 'Profile loaded');
};
```

---

## 📖 API Reference

### `ApiResponse.success(res, data, message, statusCode, meta)`
| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :---: | :--- |
| `res` | `Response` | **Yes** | — | Express-like Response Object |
| `data` | `any` | No | `null` | The actual payload data to return |
| `message` | `string` | No | `'Success'` | User-friendly message for feedback |
| `statusCode` | `number` | No | `200` | HTTP Status Code to return |
| `meta` | `any` | No | `null` | Optional custom metadata object |

### `ApiResponse.error(res, message, statusCode, errors)`
| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :---: | :--- |
| `res` | `Response` | **Yes** | — | Express-like Response Object |
| `message` | `string` | No | `'Internal Server Error'` | Human-readable error description |
| `statusCode` | `number` | No | `500` | HTTP Status Code to return |
| `errors` | `any` | No | `null` | Detailed validation errors or system debug errors |

### `ApiResponse.paginate(res, data, page, limit, totalItems, message)`
| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :---: | :--- |
| `res` | `Response` | **Yes** | — | Express-like Response Object |
| `data` | `any[]` | **Yes** | — | Array of items for the current page |
| `page` | `number` | **Yes** | — | Active page index (1-based) |
| `limit` | `number` | **Yes** | — | Number of items per page |
| `totalItems` | `number` | **Yes** | — | Total item count matching the query in database |
| `message` | `string` | No | `'Data retrieved successfully'` | Summary success description |

---

## 🪪 License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.

