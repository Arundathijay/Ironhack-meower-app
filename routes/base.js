'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('../middleware/route-guard');

const Publication = require('./../models/publication');

router.get('/', (req, res, next) => {
  Publication.find()
    .sort({ createdAt: -1 })
    .populate('creator')
    .then((publications) => {
      res.render('home', { publications });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

module.exports = router;
