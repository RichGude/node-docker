const express = require("express");

const postController = require("../controllers/postController");
const protect = require("../middleware/authMiddleware");

const router = express.Router()

// Define all functions for getting and posting to 'localhost:3000/'
router.route("/")
    .get(postController.getAllPosts)
    // Call protect function in order to require authorization prior to posting
    .post(protect, postController.createPost);

// Define all functions for getting, updating, and deleting posts to 'localhost:3000/:id'
router.route("/:id")
    .get(postController.getOnePost)
    .patch(protect, postController.updatePost)
    .delete(protect, postController.deletePost);

module.exports = router;