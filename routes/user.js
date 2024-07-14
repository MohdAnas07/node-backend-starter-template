// const express = require('express');
const userController = require('../controller/user');
const router = require('express').Router();

router
    .get('/', userController.getUsers)
    .get('/:id', userController.getUser)
    .patch('/:id', userController.updateUser)
    .delete('/:id', userController.deleteUser)

module.exports = router;
