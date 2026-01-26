const express = require('express');
const router = express.Router();
const { searchByMeasurements, getAllInventory } = require('../controllers/inventory.controller');

// Search inventory by measurements
router.get('/search', searchByMeasurements);

// Get all inventory
router.get('/', getAllInventory);

module.exports = router;
