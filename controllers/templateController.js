const Template = require("./../models/template");
exports.getTemplate = async (req, res) => {
  const template = await Template.find();
  res.json({ status: 200, data: template });
};

exports.newTemplate = async (req, res) => {
  const { title, description } = req.body;
  const newtemplate = new Template({ title, description });
  const savetemplate = await newtemplate.save();
  res.json({ status: 200, data: savetemplate });
};
