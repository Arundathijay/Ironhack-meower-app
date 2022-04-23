const express = require('express');
const User = require('../models/user');
const Publication = require('./../models/publication');
const routeGuard = require('./../middleware/route-guard');
const meowRouter = new express.Router();
const fileUpload = require('./../middleware/file-upload');

// GET - '/meow/create' - Renders meow creation page
meowRouter.get('/create', routeGuard, (req, res) => {
  res.render('meow-create');
});

// POST - '/meow/create' - Handles new meow creation
meowRouter.post(
  '/create',
  routeGuard,
  fileUpload.single('picture'),
  (req, res, next) => {
    const { message } = req.body;

    let picture;
    if (req.file) {
      picture = req.file.path;
    }
    Publication.create({
      message,
      picture,
      creator: req.user._id
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => {
        next(error);
      });
  }
);

// GET - '/meow/:id' - Loads meow from database, renders single meow page

meowRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Publication.findById(id)
    .populate('creator')
    .then((publication) => {
      res.render('meow-single', { publication });
    })
    .catch((error) => {
      next(error);
    });
});

// GET - '/meow/:id/edit' - Loads meow from database, renders meow edit page
meowRouter.get('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  Publication.findById(id)
    .populate('creator')
    .then((publication) => {
      res.render('meow-edit', { publication });
    })
    .catch((error) => {
      next(error);
    });
});

// POST - '/meow/:id/edit' - Handles edit form submission.
meowRouter.post('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  Publication.findOneAndRemove(id)
    .then(() => {
      res.render('meow-edit');
    })
    .catch((error) => {
      next(error);
    });
});

// POST - '/meow/:id/delete' - Handles deletion.
meowRouter.post('/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Publication.findOneAndRemove(id)
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = meowRouter;
