module.exports = app => {
    const userDetails = require("../controllers/password.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve a single plant with id
    router.get("/:username", userDetails.findOne);
  
    // Update a Plant with id
    router.put("/:username", userDetails.update);
  
    app.use('/api/userDetails', router);
  };