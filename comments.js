// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Comments object
const commentsByPostId = {};

// Get comments for a post
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create a comment for a post
app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { id } = req.params;
  const { content } = req.body;

  // Get comments for post
  const comments = commentsByPostId[id] || [];

  // Add new comment
  comments.push({ id: commentId, content, status: 'pending' });

  // Update comments for post
  commentsByPostId[id] = comments;

  // Send event to event bus
  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      status: 'pending',
      postId: id,
    },
  });

  // Send response
  res.status(201).send(comments);
});

// Receive events from event bus
app.post('/events', async (req, res) => {
  console.log('Event Received:', req.body.type);

  const { type, data } = req.body;

  // Check if event is comment moderated
  if (type === 'CommentModerated') {
    // Get comments for post
    const comments = commentsByPostId[data.postId];

    // Find comment
    const comment = comments.find((comment) => {
      return comment.id === data.id;
    });

    // Update comment status
    comment.status = data.status;

    // Send event to event bus
    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data,
    });
  }

  // Send response
  res.send({});
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});

