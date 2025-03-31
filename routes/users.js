var express = require('express');
var router = express.Router();
var userControllers = require('../controllers/users');
let { check_authentication, check_authorization } = require("../utils/check_auth");
const constants = require('../utils/constants');

// GET ALL: Yêu cầu quyền mod
router.get('/', check_authentication, check_authorization(constants.MOD_PERMISSION), async function(req, res, next) {
  try {
    let users = await userControllers.getAllUsers();
    res.send({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
});

// POST: Yêu cầu quyền admin
router.post('/', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function(req, res, next) {
  try {
    let body = req.body;
    let newUser = await userControllers.createAnUser(
      body.username,
      body.password,
      body.email,
      body.role
    );
    res.status(200).send({
      success: true,
      message: newUser
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: error.message
    });
  }
});

// PUT: Yêu cầu quyền admin
router.put('/:id', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function(req, res, next) {
  try {
    let body = req.body;
    let updatedUser = await userControllers.updateAnUser(req.params.id, body);
    res.status(200).send({
      success: true,
      message: updatedUser
    });
  } catch (error) {
    next(error);
  }
});

// DELETE: Yêu cầu quyền admin
router.delete('/:id', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function(req, res, next) {
  try {
    let deleteUser = await userControllers.deleteAnUser(req.params.id);
    res.status(200).send({
      success: true,
      message: deleteUser
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
