const time = (req, res) => {
  res.json({ Time: Date().toString() });
};

module.exports = time;
