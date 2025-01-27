const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER, // Your Mailtrap username
    pass: process.env.MAILTRAP_PASS, // Your Mailtrap password
  },
});

const mailOptions = {
  from: '"Mailtrap Test" <hello@demomailtrap.com>', // Sender address
  to: "vp755033@gmail.com", // List of recipients
  subject: "You are awesome!", // Subject line
  text: "Congrats for sending a test email with Mailtrap!", // Plain text body
};

transport
  .sendMail(mailOptions)
  .then((info) => {
    console.log("Email sent: " + info.response);
  })
  .catch((error) => {
    console.error("Error sending email: ", error);
  });
