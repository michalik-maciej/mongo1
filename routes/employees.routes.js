const express = require('express');

const router = express.Router();
const { ObjectId } = require('mongodb');
const { validateRequestId, messages } = require('../utils');

router.get('/employees', (req, res) => {
  req.db
    .collection('employees')
    .find()
    .toArray((err, data) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.json({ message: data });
      }
    });
});

router.get('/employees/random', (req, res) => {
  req.db
    .collection('employees')
    .aggregate([{ $sample: { size: 1 } }])
    .toArray((err, data) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.json(data[0]);
      }
    });
});

router.get('/employees/:id', (req, res) => {
  if (validateRequestId(req.params.id)) {
    req.db.collection('employees').findOne(
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

router.post('/employees', (req, res) => {
  req.db.collection('employees').insertOne({ ...req.body }, (err) => {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      res.json(messages.requestSuccess);
    }
  });
});

router.put('/employees/:id', (req, res) => {
  if (validateRequestId(req.params.id)) {
    req.db
      .collection('employees')
      .updateOne(
        { _id: ObjectId(req.params.id) },
        { $set: { ...req.body } },
        (err) => {
          if (err) {
            res.status(500).json({ message: err });
          } else {
            res.json(messages.requestSuccess);
          }
        },
      );
  } else {
    res.status(404).json(messages.requestInvalid);
  }
});

router.delete('/employees/:id', (req, res) => {
  if (validateRequestId(req.params.id)) {
    req.db
      .collection('employees')
      .deleteOne({ _id: ObjectId(req.params.id) }, (err) => {
        if (err) {
          res.status(500).json({ message: err });
        } else {
          res.json(messages.requestSuccess);
        }
      });
  } else {
    res.status(404).json(messages.requestInvalid);
  }
});

module.exports = router;
