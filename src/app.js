const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const Post = require('./Models/post');

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Blog')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// POST route for submitting a new blog post
app.post('/blognames', (req, res) => {
    const { title, content, author, createdAt } = req.body;
    const newPost = new Post({
        title,
        content,
        author,
        createdAt: new Date(createdAt)
    });
    newPost.save()
        .then(() => {
            console.log('New blog post saved successfully');
            res.redirect('/');
        })
        .catch((error) => {
            console.error('Error saving blog post:', error);
            res.status(500).send('Error saving blog post');
        });
});

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
// Route to serve the index.html file
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'index.html'));
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
