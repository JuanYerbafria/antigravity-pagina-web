const express = require('express'); // Server entry point
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get('/', (req, res) => {
  res.json({ message: 'API Grupo Llantero Noguez funcionando correctamente.' });
});

// Routes
app.use('/api/products', require('./routes/products.routes'));
app.use('/api/branches', require('./routes/branches.routes'));
app.use('/api/services', require('./routes/services.routes'));
app.use('/api/contact', require('./routes/contact.routes'));
app.use('/api/blog', require('./routes/blog.routes'));
app.use('/api/inventory', require('./routes/inventory.routes'));
app.use('/api/team', require('./routes/team.routes'));
app.use('/api/vacancies', require('./routes/vacancies.routes'));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Server started
