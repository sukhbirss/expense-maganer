const express = require('express');
const authController = require('./../controllers/authController');
const postController = require('./../controllers/postController');

const router = express.Router();

router.use(authController.protect);
router.post('/add',postController.post);
router.get('/get',postController.getPosts);
router.patch('/delete',postController.deleteMyPost);

module.exports = router;