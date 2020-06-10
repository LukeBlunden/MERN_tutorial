const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item model (datebase schema) -  needed to make queries
const Item = require("../../models/Item");

// @route   GET api/items
// @desc    Get all items
// @access  Private
// /api/items/ redirected from server.js
router.get("/", (req, res) => {
  // .find() & .sort() are mongoose methods
  Item.find()
    .sort({ date: -1 }) // -1 = descending
    .then((items) => res.json(items));
});

// @route   POST api/items
// @desc    Create an Item
// @access  Private
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem.save().then((item) => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete an Item
// @access  Public
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
