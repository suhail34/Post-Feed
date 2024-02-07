const Post = require('../models/post.model');

const handleErrors = (err) => {
  let errors = {username:'', content: '', comment: ''};
  if(err.message.includes('Post validation failed')) {
    Object.values(err.errors).forEach(({properties})=>{
      if (properties.path === 'comments') {
        errors['comment'] = properties.message;
      } else {
        errors[properties.path] = properties.message;
      }
    });
  }
  return errors;
}

const create_post = async (req, res) => {
  console.log(req.body)
  const { username, content, comment } = req.body;
  try {
    let post;
    if (comment) {
      const subDoc = new Post({username, content, comments: [comment]});
      const validataionError = subDoc.validateSync();
      if (validataionError) {
        throw validataionError;
      }
      post = await Post.findOneAndUpdate(
        {username, content},
        {$addToSet: {comments: comment}},
        {new: true, upsert: true}
      );
    } else {
      post = await Post.create({username, content});
    }
    res.status(200).json({"resp": "Post created Successully", post})
  } catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({errors});
  }
}

const list_posts = async (req, res) => {
  try {
    let posts = await Post.find()
    res.status(200).json({"posts": posts});
  }catch (err) {
    res.status(400).json({"error": err});
  }
}

module.exports = { create_post, list_posts };
