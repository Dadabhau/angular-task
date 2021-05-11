const express = require('express');
const app = express();
const organizationRoute = express.Router();

// Employee model
let Organization = require('../models/organization');

// Add Employee
organizationRoute.route('/create').post((req, res, next) => {
  Employee.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Employees
organizationRoute.route('/').get((req, res) => {
  Employee.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single employee
organizationRoute.route('/read/:id').get((req, res) => {
  Employee.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update employee
organizationRoute.route('/update/:id').put((req, res, next) => {
  Employee.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete employee
organizationRoute.route('/delete/:id').delete((req, res, next) => {
  Employee.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = organizationRoute;