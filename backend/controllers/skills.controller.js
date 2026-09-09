const Skills = require("../models/skills");
const createCrudController = require("./crudFactory");

module.exports = createCrudController(Skills, { entityName: "Skill", sort: { category: 1, name: 1 } });
