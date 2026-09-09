const Project = require("../models/projects");
const createCrudController = require("./crudFactory");

module.exports = createCrudController(Project, { entityName: "Project" });
