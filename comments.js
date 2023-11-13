// create web server
// 1. create web server
// 2. create router
// 3. create router handler
// 4. listen to port 3000

const express = require('express');
const app = express();
const commentsRouter = require('./routes/comments');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/comments', commentsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Path: routes/comments.js
// create router
// 1. create router
// 2. create router handler

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('GET /comments');
});

router.post('/', (req, res) => {
  res.send('POST /comments');
});

router.get('/:id', (req, res) => {
  res.send('GET /comments/:id');
});

router.patch('/:id', (req, res) => {
  res.send('PATCH /comments/:id');
});

router.delete('/:id', (req, res) => {
  res.send('DELETE /comments/:id');
});

module.exports = router;

// Path: models/comment.js
// create model
// 1. create model

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: String,
});

const Comment = mongoose.model('Comment', commentSchema);  


