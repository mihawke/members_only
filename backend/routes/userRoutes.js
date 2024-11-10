// routes/userRoutes.js
const express = require('express');
const usersController = require('../controllers/usersController');
const { validateUserSignup, validateUserLogin } = require('../controllers/validateUser');

const userRoutes = express.Router();

userRoutes.get('/', usersController.getUsers)
userRoutes.get('/user/:email', usersController.getUserByEmail)

userRoutes.post('/signup', validateUserSignup , usersController.createUser)
userRoutes.post('/login', validateUserLogin , usersController.getUserAccount)

userRoutes.post('/create-post' , usersController.postMessage)
userRoutes.get('/get-posts' , usersController.getAllPosts)

module.exports = userRoutes;
