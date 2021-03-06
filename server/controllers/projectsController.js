const express = require('express');
const db = require('../model/db.js');

const projectsController = {};

projectsController.getProjects = (req, res, next) => {
  const queryText = 'SELECT * FROM project WHERE user_id = $1;';

  // if login or signup res.locals.user will contain user info, else req.body will be a direct request with user_id in body.
  const user_id = res.locals.user ? res.locals.user._id : req.body.user_id;
  const values = [user_id]

  db.query(queryText, values)
    .then(data => {
      res.locals.projects = data.rows;
      return next();
    })
    .catch(err => next({
      log: 'Error in projectsController.getProjects',
      status: 400,
      message: err,
    }));
}

projectsController.addProject = (req, res, next) => {

  const { title, user_id } = req.body;
  const values = [title, user_id]
  const queryText = 'INSERT INTO project (title, user_id) VALUES ($1, $2);';

  db.query(queryText, values)
    .then(data => {
      console.log(`something has been added to the DB`);
      return next()
    })
    .catch(err => next({
      log: 'Error in projectController.addProject',
      status: 400,
      message: err,
    }));
}

projectsController.deleteProject = (req, res, next) => {
  const {_id, user_id } = req.body;
  const values = [_id, user_id];
  const queryText = `
    DELETE FROM Project
    WHERE _id = $1 AND user_id = $2
    RETURNING title, _id;
  `;

  db.query(queryText, values)
    .then(data => {
      res.locals.projects = data.rows
      return next();
    })
    .catch(err => next({
      log: 'Error in projectsController.deleteProjects',
      status: 400,
      message: err,
    }));
}

module.exports = projectsController;
