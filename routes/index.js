const express = require("express");
const router = express.Router();

// Sample messages array
const messages = [
  {
    text: "Hi there!",
    user: "Garcia",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

// Index route
router.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

router.get('/new', (req, res) => {
  res.render('form', { title: "New Message" });
});

// POST route to handle form submission
router.post('/new', (req, res) => {
  const messageUser = req.body.messageUser;
  const messageText = req.body.messageText;
  
  messages.push({ 
    text: messageText, 
    user: messageUser, 
    added: new Date() 
  });
  
  res.redirect('/');
});

// GET route for individual message
router.get('/message/:id', (req, res) => {
  const messageId = req.params.id;
  const message = messages[messageId];
  
  if (message) {
    res.render('message', { title: "Message Details", message: message });
  } else {
    res.status(404).send('Message not found');
  }
});

module.exports = router;
