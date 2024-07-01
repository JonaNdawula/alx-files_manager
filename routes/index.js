const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid'); 
const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');
const { ObjectId } = require('mongodb'); 
const fs = require('fs');
const mime = require('mime-types'); 
const imageThumbnail = require('image-thumbnail'); 

// Controllers
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');
const FilesController = require('../controllers/FilesController');

// GET /status
router.get('/status', AppController.getStatus);

// GET /stats
router.get('/stats', AppController.getStats);

// POST /users
router.post('/users', UsersController.postNew);

// GET /connect
router.get('/connect', AuthController.getConnect);

// GET /disconnect
router.get('/disconnect', AuthController.getDisconnect);

// GET /users/me
router.get('/users/me', UsersController.getMe);

// POST /files
router.post('/files', FilesController.postUpload);

// GET /files/:id
router.get('/files/:id', FilesController.getShow);

// GET /files
router.get('/files', FilesController.getIndex);

// PUT /files/:id/publish
router.put('/files/:id/publish', FilesController.putPublish);

// PUT /files/:id/unpublish
router.put('/files/:id/unpublish', FilesController.putUnpublish);

// GET /files/:id/data
router.get('/files/:id/data', FilesController.getFile);

module.exports = router;

