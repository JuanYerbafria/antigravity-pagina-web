const express = require('express');
const router = express.Router();
const statsController = require('../controllers/stats.controller');

router.get('/', statsController.getVisits);
router.post('/increment', statsController.incrementVisits);

module.exports = router;
