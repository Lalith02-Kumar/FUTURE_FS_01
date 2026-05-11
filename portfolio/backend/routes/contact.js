const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../db');

router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').isLength({ min: 5 }).withMessage('Message must be at least 5 characters long')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, email, message } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    res.status(200).json({ success: true, message: 'Message received.' });
  } catch (error) {
    console.error('Error inserting message:', error);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

module.exports = router;
