const express = require('express');
const { ApiResponse } = require('../dist/index.js'); // Require compiled package

const app = express();
app.use(express.json());

// 1. Success response example
app.get('/api/success', (req, res) => {
  const data = {
    user: {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com'
    }
  };
  ApiResponse.success(res, data, 'User profile fetched successfully', 200);
});

// 2. Error response example
app.get('/api/error', (req, res) => {
  const errors = {
    email: 'Email address is invalid',
    password: 'Password must be at least 8 characters long'
  };
  ApiResponse.error(res, 'Validation failed', 400, errors);
});

// 3. Paginated response example
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ];
  
  const { page = 1, limit = 10 } = req.query;
  const totalUsersInDatabase = 50;

  ApiResponse.paginate(
    res,
    users,
    page,
    limit,
    totalUsersInDatabase,
    'Users list retrieved successfully'
  );
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Example server running on http://localhost:${PORT}`);
  console.log(`🔗 Success Response:   http://localhost:${PORT}/api/success`);
  console.log(`🔗 Error Response:     http://localhost:${PORT}/api/error`);
  console.log(`🔗 Paginated Response: http://localhost:${PORT}/api/users?page=2&limit=3`);
});
