import express from 'express';
import { addComments, getFeedPosts, getUserPosts, likePost, deletePost } from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

/**
 * This line in your Express application creates an instance of an Express router.  An Express router acts like a mini-application, 
 * allowing you to group related routes together and define middleware specific to that group of routes. 
 * 
 * @date 27/03/2024 - 00:40:53
 *
 * @type {*}
 */
const router = express.Router();

//READ
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId', verifyToken, getUserPosts);

//POST
router.post('/:id/comment', verifyToken, addComments)

//UPDATE
router.patch('/:id/like', verifyToken, likePost);

//DELETE
router.delete('/:id/delete', verifyToken, deletePost);

export default router;