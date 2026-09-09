const Experience = require("../models/experience");
const createCrudController = require("./crudFactory");

module.exports = createCrudController(Experience, { entityName: "Experience" });
