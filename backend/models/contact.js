const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    unread: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

router.get("/", async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});


router.post("/", async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json(contact);
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json(contact);

    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});


router.patch('/:id/read', async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(req.params.id,
      { unread: false },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark message as read' });
  }
});


module.exports = router;

