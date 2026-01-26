const express = require('express');
const router = express.Router();
const { getVacancies, getVacancyById } = require('../controllers/vacancies.controller');

router.get('/', getVacancies);
router.get('/:id', getVacancyById);

module.exports = router;
