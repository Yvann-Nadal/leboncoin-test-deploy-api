const Post = require('../models/post.model');
const UploadFileModel = require('../models/uploadFile.model');
const uploadOneFileInAws = require('../utils/aws-s3');

const PostController = {
    async createPost(req, res) {
        const { title, content, formatted_address, city, country, lat, lng, postal_code } = req.body;

        try {
            const post = new Post({
                title,
                content,
                formatted_address,
                city,
                country,
                lat,
                lng,
                postal_code
            })
            await post.save();

            await Promise.all(req.files.map(async (file) => {
                const uploadFileInAws = await uploadOneFileInAws(file, post._id);
                const uploadFile = new UploadFileModel({
                    ...uploadFileInAws,
                    post: post._id
                });
                await uploadFile.save();
                post.uploadFiles.push(uploadFile);
            }))

            console.log("post :", post);

            await post.save();

            res.status(201).send(post);
        } catch (error) {
            res.status(409).send({ message: error.message });
        }


    },
    async getPosts(req, res) {
        const posts = await Post.find().populate('uploadFiles');
        res.status(200).send(posts);
    },
    async getPost(req, res) {
        const { id } = req.params;
        try {
            const post = await Post.findById(id).populate('uploadFiles');
            console.log("post :", post)
            res.status(200).send(post);
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    },
    async updatePost(req, res) {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        const post = getPost(id);
        const updatedPost = {
            ...post,
            ...req.body
        }

        try {
            await updatedPost.save();
            res.status(200).send(updatedPost);
        } catch (error) {
            res.send(409).send({ message: error.message })
        }
    },
    async deletePost(req, res) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
        await Post.findByIdAndRemove(id);
        res.status(200).send({ message: 'Post deleted successfully.' });
    }
}

module.exports = PostController