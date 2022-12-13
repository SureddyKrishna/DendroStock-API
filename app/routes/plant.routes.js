module.exports = app => {
    const plants = require("../controllers/plant.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Plant
    router.post("/", plants.create);
  
    // Retrieve all Plants
    router.get("/", plants.findAll);
  
    // Retrieve all published Plants
    router.get("/published", plants.findAllPublished);
  
    // Retrieve a single plant with id
    router.get("/:id", plants.findOne);
  
    // Update a Plant with id
    router.put("/:id", plants.update);
  
    // Delete a Plant with id
    router.delete("/:id", plants.delete);
  
    // Delete all Plants
    router.delete("/", plants.deleteAll);
  
    app.use('/api/plants', router);
  };