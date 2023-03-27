const exppress = require('express');
const router = exppress.Router();

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const postController = require('../controllers/post.controller');

const endPoint = '/posts';

router.post(endPoint, upload.array('photos', 8), postController.createPost);
router.get(endPoint, postController.getPosts);
router.get(`${endPoint}/:id`, postController.getPost);
router.put(`${endPoint}/:id`, upload.array('photos', 8), postController.updatePost);
router.delete(`${endPoint}/:id`, postController.deletePost);

module.exports = router;