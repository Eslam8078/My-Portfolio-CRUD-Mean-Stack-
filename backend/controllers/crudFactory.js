const asyncHandler = require("../utils/asyncHandler");

function createCrudController(Model, { entityName, sort = { createdAt: -1 } }) {
    const list = asyncHandler(async (req, res) => {
        const items = await Model.find({ isDeleted: false }).sort(sort);
        res.status(200).json(items);
    });

    const getById = asyncHandler(async (req, res) => {
        const item = await Model.findOne({ _id: req.params.id, isDeleted: false });

        if (!item) {
            return res.status(404).json({ message: `${entityName} not found` });
        }

        res.status(200).json(item);
    });

    const create = asyncHandler(async (req, res) => {
        const item = await Model.create(req.body);
        res.status(201).json(item);
    });

    const update = asyncHandler(async (req, res) => {
        const item = await Model.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, req.body, {
            new: true,
            runValidators: true
        });

        if (!item) {
            return res.status(404).json({ message: `${entityName} not found` });
        }

        res.status(200).json(item);
    });

    const remove = asyncHandler(async (req, res) => {
        const item = await Model.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!item) {
            return res.status(404).json({ message: `${entityName} not found` });
        }

        res.status(200).json({ message: `${entityName} deleted`, id: item._id });
    });

    return { list, getById, create, update, remove };
}

module.exports = createCrudController;
