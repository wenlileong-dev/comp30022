const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.authUser = (req, res, next) => {
  // Read the token from the cookie
  const token = req.cookies.token;
  if (!token)
    return res.json({
      status: 401,
      errorMsg: "Access denied...No token provided...",
    });
  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (er) {
    // console.log("err", er);
    //Incase of expired jwt or invalid token kill the token and clear the cookie
    res.clearCookie("token");
    return res.json({
      status: 400,
      errorMsg: "Access denied...Invalied token",
    });
  }
};

//Less secure app access
exports.sendEmail = async (email, subject, text) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_USER, // generated ethereal user
      pass: process.env.GMAIL_PASS, //generated ethereal password
    },
  });

  var mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
