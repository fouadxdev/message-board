const express = require('express');
const router = express.Router();
const db = require('../db/queries');

// Index route - get all messages from database
router.get('/', async (req, res) => {
  const messages = await db.getAllMessages();
  res.render('index', { title: "Mini Messageboard", messages: messages });
});

// GET route for the form
router.get('/new', (req, res) => {
  res.render('form', { title: "New Message" });
});

// POST route to handle form submission
router.post('/new', async (req, res) => {
  const { messageUser, messageText } = req.body;
  await db.insertMessage(messageUser, messageText);
  res.redirect('/');
});

// GET route for individual message
router.get('/message/:id', async (req, res) => {
  const messageId = req.params.id;
  const message = await db.getMessageById(messageId);
  
  if (message) {
    res.render('message', { title: "Message Details", message: message });
  } else {
    res.status(404).send('Message not found');
  }
});

module.exports = router;