const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Routes
router.post('/posts', postController.createPost);          // Create a post
router.get('/posts', postController.getAllPosts);          // Get all posts
router.get('/posts/:id', postController.getPostById);      // Get a post by ID
router.put('/posts/:id', postController.updatePost);       // Update a post by ID
router.delete('/posts/:id', postController.deletePost);    // Delete a post by ID
router.patch('/posts/:id/reactions', postController.updateReactions); // Update reactions

module.exports = router;
