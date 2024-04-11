import Post from '../models/Post.js';
import User from '../models/User.js';

//READ
//read all posts
/**
 * This function retrieves all posts from the database using Mongoose. If successful, it returns a 200 status code with an array containing all retrieved posts. 
 * In case of errors, it returns a 404 status code indicating "unable to find requested resource" along with the error message. 
 * 
 * @date 27/03/2024 - 00:27:17
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
export const getFeedPosts = async (req, res) => {
  try {
    //grab all posts
    const allPosts = await Post.find();
    //200 status: successful request
    res.status(200).json(allPosts);

  } catch (err) {
    //404 status: unable to find requested resource
    res.status(404).json({ messaage: err.message });
  }
};

/**
 * This function fetches posts authored by a specific user. It extracts the user ID from the request parameters and uses Mongoose to find all posts where the `userId` field matches the extracted ID. 
 * Upon success, it returns a 200 status code with an array containing the retrieved posts for that user. Similar to `getFeedPosts`, 
 * it handles errors by returning a 404 status code indicating "unable to find requested resource" along with the error message.
 * 
 * @date 27/03/2024 - 00:27:17
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
export const getUserPosts = async (req, res) => {
  try {
    //get user id
    const { userId } = req.params;
    //find post vis userId
    const postByUser = await Post.find({ userId });
    //200 status: successful request
    res.status(200).json(postByUser);

  } catch (err) {
    //404 status: unable to find requested resource
    res.status(404).json({ messaage: err.message });
  }
};

//UPDATE
/**
 * This function toggles a user's like on a post. It retrieves the post by ID, checks the user's like status, and updates the likes map accordingly. 
 * Finally, it updates the post and returns it upon success. Errors are handled with a 404 status code.
 * 
 * @date 27/03/2024 - 00:27:17
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
export const likePost = async (req, res) => {
  try {
    //id comes from params
    const { id } = req.params;
    //userId comes from body
    const { userId } = req.body;

    //find post by id
    const postByUser = await Post.findById(id);
    //see whether the post is already liked or not
    const isPostLiked = postByUser.likes.get(userId);

    if (isPostLiked) {
      //delete key
      postByUser.likes.delete(userId);
    } else {
      //set new key
      postByUser.likes.set(userId, true);
    }

    //update post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: postByUser.likes },
      { new: true }
    );
    //200 status: successful request
    res.status(200).json(updatedPost)
    
  } catch (err) {
    //404 status: unable to find requested resource
    res.status(404).json({ messaage: err.message });
  }
};

/**
 * Deletes a post.
 * 
 * @date 27/03/2024 - 00:27:17
 * @async
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @returns {Promise<void>}
 */

export const deletePost = async (req, res) => {
  try {
    //id comes from params
    const { id } = req.params;
    //userId comes from body
    const { userId } = req.body;

    //find post by id
    const postByUser = await Post.findById(id);

    if (!postByUser) {
      return res.status(404).json({ error: 'User already exists.' });
    }

    // Delete the post by id
    const deletedPost = await Post.findByIdAndDelete(id);
    //200 status: successful request
    res.status(200).json({message: 'Post deleted successfully.'})
    
  } catch (err) {
    //404 status: unable to find requested resource
    res.status(404).json({ messaage: err.message });
  }
};

/**
 * Adds comments to a post.
 * 
 * @date 27/03/2024 - 00:27:17
 * @async
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @returns {Promise<void>}
 */

export const addComments = async (req, res) => {
  try {
    //id comes from params
    const { id } = req.params;
    //userId comes from body
    const { comment } = req.body;
    
    //find post by id
    const postByUser = await Post.findById(id);
    //get existing comments of that post
    const newComments = [...postByUser.comments, comment]
    //update post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { comments: newComments },
      { new: true }
    );
    //200 status: successful request
    res.status(200).json(updatedPost)
    
  } catch (err) {
    //404 status: unable to find requested resource
    res.status(404).json({ messaage: err.message });
  }
};

//CREATE
//create a new post
/**
 * This function creates a new post. It retrieves post details and user information from the request body, builds a new Post object, and saves it to the database. 
 * Upon success, it returns a 201 status code with all retrieved posts including the newly created one. In case of errors, 
 * it returns a 409 status code indicating "unable to create resource" along with the error message.
 * 
 * @date 27/03/2024 - 00:27:17
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
export const createPost = async (req, res) => {
  try {
    //get post attributes
    const { userId, description, picturePath, postHeader } = req.body;
    //find user by id
    const userStoredInDB = await User.findById(userId);
    //create new post with attributes
    const newPost = new Post({
      userId,
      firstName: userStoredInDB.firstName,
      lastName: userStoredInDB.lastName,
      postHeader: postHeader,
      description: description,
      userPicturePath: userStoredInDB.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    //save into the mongoDB
    await newPost.save();

    //grab all posts including the new post
    const allPosts = await Post.find();
    //201 status: successful creation
    res.status(201).json(allPosts);

  } catch (err) {
    //409 status: unable to create resource
    res.status(409).json({ error: err.message });
  }
};