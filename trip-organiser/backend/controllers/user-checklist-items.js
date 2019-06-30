const CheckListItem = require("../models/user-checklist-item");

exports.getChecklistItems = (req, res, next) => {
  CheckListItem.find({createdById: req.userData.userId, tripId: req.params.tripId, deletedAt: null}).then((data) => {
    res.status(200).json({
      checklistItems: data,
      message: "Checklist fetched",
    });
  }).catch((err) => {
    res.status(500).json({
      message: "Error adding checklist item",
    });
  });
};

exports.addChecklistItem = (req, res, next) => {
  const checkListItem = new CheckListItem({
    ...req.body,
    createdById: req.userData.userId,
    completedAt: null,
    deletedAt: null,
  });
  checkListItem.save().then((checklistItem) => {
    res.status(200).json({
      checklistItem,
      message: "Item Added",
    });
  }).catch((err) => {
    res.status(500).json({
      message: "Error adding checklist item",
    });
  });
};

exports.removeChecklistItem = (req, res, next) => {
  console.log('remove item')
  CheckListItem.updateOne({
    _id: req.body.checklistItemId,
    createdById: req.userData.userId,
  }, {$set: {"deletedAt": Date.now()}}).then((data) => {
    res.status(200).json({
      message: "Item removed",
    });
  }).catch((err) => {
    res.status(500).json({
      message: "Something went wrong",
    });
  });
};

exports.updateChecklistItem = (req, res, next) => {
  CheckListItem.updateOne({
    _id: req.body.checklistItemId,
    createdById: req.userData.userId,
  }, {$set: {"completedAt": req.body.completedAt}}).then((data) => {
      res.status(200).json({
        message: "Item updated",
      });
    },
  ).catch((err) => {
    res.status(500).json({
      message: "Something went wrong",
    });
  });
};
