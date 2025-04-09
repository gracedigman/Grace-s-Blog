const express = require('express');
const router = express.Router();

// In-memory storage for blog posts
let posts = [
    {
      id: 1,
      title: 'Welcome to My Blog',
      content: 'This is my first post. I\'m excited to share my thoughts with you!',
      createdAt: new Date()
    }
  ];

// Home page - Show all posts
router.get('/', (req, res) => {
  res.render('home', { 
    title: 'My Blog',
    posts: posts.sort((a, b) => b.createdAt - a.createdAt) 
  });
});

// Display create post form
router.get('/posts/new', (req, res) => {
  res.render('create', { title: 'Create New Post' });
});

// Handle post creation
router.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1,
    title,
    content,
    createdAt: new Date()
  };
  posts.push(newPost);
  res.redirect('/');
});

// Display edit post form
router.get('/posts/:id/edit', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  
  if (!post) {
    return res.status(404).send('Post not found');
  }
  
  res.render('edit', { title: 'Edit Post', post });
});

// Handle post update
router.put('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).send('Post not found');
  }
  
  const { title, content } = req.body;
  posts[index] = {
    ...posts[index],
    title,
    content,
    updatedAt: new Date()
  };
  
  res.redirect('/');
});

// Handle post deletion
router.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  posts = posts.filter(p => p.id !== id);
  res.redirect('/');
});

module.exports = router;