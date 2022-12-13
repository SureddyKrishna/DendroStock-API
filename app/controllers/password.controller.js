const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;



// Find a user with an username
exports.findOne = (req, res) => {


const username = req.query.title;
var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

User.findOne({ where: condition })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving plants."
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




