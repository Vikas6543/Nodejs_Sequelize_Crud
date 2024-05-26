const Notification = require('../models/notificationsModel');

exports.getNotifications = async (req, res) => {
  const notifications = await Notification.findAll({
    where: { user_id: req.user.id },
  });
  res.json(notifications);
};

exports.markAsRead = async (req, res) => {
  const notifications = await Notification.update(
    { is_read: true },
    { where: { user_id: req.user.id, is_read: false } }
  );
  res.json(notifications);
};
