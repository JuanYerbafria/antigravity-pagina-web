const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');

router.get('/', blogController.getPosts);
router.get('/:id', blogController.getPostById);

module.exports = router;
