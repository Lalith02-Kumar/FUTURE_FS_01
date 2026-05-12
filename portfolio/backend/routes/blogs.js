const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../db');

// GET all blogs
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM blogs ORDER BY created_at DESC');
    res.status(200).json({ success: true, blogs: rows });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

// POST a new blog
router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { title, content } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO blogs (title, content) VALUES (?, ?)',
      [title, content]
    );
    res.status(201).json({ success: true, message: 'Blog posted successfully', id: result.insertId });
  } catch (error) {
    console.error('Error inserting blog:', error);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

// DELETE a blog
router.delete('/:id', async (req, res) => {
  const blogId = req.params.id;
  console.log(`Received request to delete blog with ID: ${blogId}`);
  try {
    const [result] = await db.query('DELETE FROM blogs WHERE id = ?', [blogId]);
    console.log(`Delete result for ID ${blogId}:`, result);
    if (result.affectedRows === 0) {
      console.warn(`No blog found with ID: ${blogId}`);
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    console.error(`Error deleting blog with ID ${blogId}:`, error);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

module.exports = router;
