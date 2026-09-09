const Education = require("../models/education");
const createCrudController = require("./crudFactory");

module.exports = createCrudController(Education, { entityName: "Education" });
