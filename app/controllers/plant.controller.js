const db = require("../models");
const Plant = db.plants;
const Op = db.Sequelize.Op;
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: plants } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, plants, totalPages, currentPage };
};

// Create Plant in Database.
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Plant
  const plant = {
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    price: req.body.price,
    published: req.body.published ? req.body.published : false
  };
  console.log(plant);

  // Save plant in the database
  Plant.create(plant)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Plant."
      });
    });
};

//Retrieve all Plants/ find by title from the database:
exports.findAll = (req, res) => {
  const { page, size, title } = req.query;

  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);
  
  Plant.findAndCountAll({ where: condition, limit, offset })
  .then(data => {
    const response = getPagingData(data, page, limit);
    res.send(response);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving plants."
    });
  });
};

// Find a single Plant with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Plant.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Plant with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Plant with id=" + id
      });
    });
};


// Update a Plant identified by the id in the request

exports.update = (req, res) => {
  const id = req.params.id;

  Plant.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Plant details was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Plant with id=${id}. Maybe Plant was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Plant with id=" + id
      });
    });
};

// Find a single Plant with an id

exports.findOne = (req, res) => {
  const id = req.params.id;

  Plant.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Plant with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Plant with id=" + id
      });
    });
};

// Delete a Plant with the specified id:

exports.delete = (req, res) => {
  const id = req.params.id;

  Plant.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Plant was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Plant with id=${id}. Maybe Plant was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Plant with id=" + id
      });
    });
};

// Delete all Plants from the database:
exports.deleteAll = (req, res) => {
  Plant.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Plants were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all plants."
      });
    });
};

// Find all Plants with published = true:

exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Plant.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving plants."
      });
    });
};

