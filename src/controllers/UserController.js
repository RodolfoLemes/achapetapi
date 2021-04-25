const User = require('../models/User');

module.exports = {
  async create(req, res) {
    const { email } = req.body;

    const user = await User.create({ email });

    res.send({ user });
  },
};
