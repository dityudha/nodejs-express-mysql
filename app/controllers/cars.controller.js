const Cars = require("../models/cars.model.js");

// Create and Save a new Cars
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Data tidak boleh kosong!"
      });
    }
  
    // Create a Cars
    const cars = new Cars({
      brand: req.body.brand,
      type: req.body.type,
      sold: req.body.sold || false
    });
  
    // Save Cars in the database
    Cars.create(cars, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Cars."
        });
      else res.send(data);
    });
  };

// Retrieve all Cars from the database (with condition).
exports.findAll = (req, res) => {
    const brand = req.query.brand;
  
    Cars.getAll(brand, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cars."
        });
      else res.send(data);
    });
  };
  
  exports.findAllSold = (req, res) => {
    Cars.getAllSold((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cars."
        });
      else res.send(data);
    });
  };

// Find a single Cars with a id
exports.findOne = (req, res) => {
    Cars.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cars with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Cars with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

// Update a Cars identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    Cars.updateById(
      req.params.id,
      new Cars(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Cars with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Cars with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Cars with the specified id in the request
exports.delete = (req, res) => {
    Cars.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cars with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Cars with id " + req.params.id
          });
        }
      } else res.send({ message: `Cars was deleted successfully!` });
    });
  };

// Delete all Cars from the database.
exports.deleteAll = (req, res) => {
    Cars.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all cars."
        });
      else res.send({ message: `All Cars were deleted successfully!` });
    });
  };