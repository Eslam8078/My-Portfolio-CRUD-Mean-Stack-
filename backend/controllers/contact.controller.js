const Contact = require("../models/contact");
const asyncHandler = require("../utils/asyncHandler");

const list = asyncHandler(async (req, res) => {
    const messages = await Contact.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.status(200).json(messages);
});

const create = asyncHandler(async (req, res) => {
    const contact = await Contact.create({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    });
    res.status(201).json(contact);
});

const remove = asyncHandler(async (req, res) => {
    const contact = await Contact.findOneAndUpdate(
        { _id: req.params.id, isDeleted: false },
        { isDeleted: true },
        { new: true }
    );

    if (!contact) {
        return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted", id: contact._id });
});

const markAsRead = asyncHandler(async (req, res) => {
    const contact = await Contact.findOneAndUpdate(
        { _id: req.params.id, isDeleted: false },
        { unread: false },
        { new: true }
    );

    if (!contact) {
        return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json(contact);
});

module.exports = { list, create, remove, markAsRead };
