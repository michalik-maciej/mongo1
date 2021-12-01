const express = require('express');

const router = express.Router();
const { ObjectId } = require('mongodb');
const { validateRequestId, messages } = require('../utils');
const Department = require('../models/department.model');

router.get('/departments', (req, res) => {
  req.db
    .collection('departments')
    .find()
    .toArray((err, data) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.json({ message: data });
      }
    });
});

router.get('/departments/random', (req, res) => {
  req.db
    .collection('departments')
    .aggregate([{ $sample: { size: 1 } }])
    .toArray((err, data) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.json(data[0]);
      }
    });
});

router.get('/departments/:id', (req, res) => {
  if (validateRequestId(req.params.id)) {
    req.db.collection('departments').findOne(
      {
        _id: ObjectId(req.params.id),
      },
      (err, data) => {
        if (err) {
          res.status(500).json({ message: err });
        } else if (!data) {
          res.status(404).json(messages.notFound);
        } else {
          res.json(data);
        }
      },
    );
  } else {
    res.status(404).json(messages.requestInvalid);
  }
});

router.post('/departments', async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = new Department({ name });
    await newDepartment.save();
    res.json(messages.requestSuccess);
  } catch (err) {
    res.status(500).json(messages.requestError(err));
  }
});

router.put('/departments/:id', (req, res) => {
  if (validateRequestId(req.params.id)) {
    const { name } = req.body;
    req.db
      .collection('departments')
      .updateOne(
        { _id: ObjectId(req.params.id) },
        { $set: { name } },
        (err) => {
          if (err) res.status(500).json({ message: err });
          else res.json(messages.requestSuccess);
        },
      );
  } else {
    res.status(404).json(messages.requestInvalid);
  }
});

router.delete('/departments/:id', (req, res) => {
  if (validateRequestId(req.params.id)) {
    req.db
      .collection('departments')
      .deleteOne({ _id: ObjectId(req.params.id) }, (err) => {
        if (err) res.status(500).json({ message: err });
        else res.json(messages.requestSuccess);
      });
  } else {
    res.status(404).json(messages.requestInvalid);
  }
});

module.exports = router;
