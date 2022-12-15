import * as postsDao from "./posts-dao.js";

const PostsController = (app) => {

    const createPost = async (req, res) => {
        const uid = req.session['currentUser']._id
        const {pid} = req.params;
        const postBody = req.body;
    
        const newPost = await postsDao.createPost({...postBody, user: uid, plan: pid})
        res.json(newPost)
    }
    const deletePost = async (req, res) => {
        const {postId} = req.params;
    
        const status = await postsDao.deletePost(postId)
        res.send(status);
    }
    const deleteAllPostsForPlan = async (req, res) => {
        const {pid} = req.params;
    
        const status = await postsDao.deleteAllPostsForPlan(pid)
        res.send(status);
    }
    const updatePost = async (req, res) => {
        const {postId} = req.params;
		const postUpdates = req.body;
        const updatedPost = await postsDao.updatePost(postId, postUpdates);
		res.json(updatedPost);
    }
    const updateIngredient = async (req, res) => {
        const {postId} = req.params;
		const {ingredient, owned} = req.body;
        const updatedPost = await postsDao.updateIngredient(postId, ingredient, owned);
		res.json(updatedPost);
    }
    const findAllPosts = async (req, res) => {
        const posts = await postsDao.findAllPosts()
        res.json(posts)
    }
    const findPostsForUser = async (req, res) => {
        const {uid} = req.params;
        
        const plans = await postsDao.findPostsForUser(uid)
        res.json(plans)
    }
    const findPostsForPlan = async (req, res) => {
        const {pid} = req.params;
        
        const users = await postsDao.findPostsForPlan(pid)
        res.json(users)
    }
    const voteForPost = async (req, res) => {
        const uid = req.session['currentUser']._id
        const {postId} = req.params;
		const {vote} = req.body;

        const updatedPost = await postsDao.voteForPost(postId, uid, vote);
		res.json(updatedPost);
    }

    app.post('/plans/:pid/posts', createPost)
    app.delete('/plans/:pid/posts/:postId', deletePost)
    app.put('/plans/:pid/posts/:postId', updatePost)
    app.put('/plans/:pid/posts/:postId/votes', voteForPost)
    app.put('/plans/:pid/posts/:postId/ingredients', updateIngredient)
    app.delete('/plans/:pid/posts', deleteAllPostsForPlan)
    app.get('/posts', findAllPosts)
    app.get('/users/:uid/posts', findPostsForUser)
    app.get('/plans/:pid/posts', findPostsForPlan)
}

export default PostsController;