const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  const data = req.body;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "vedna400@gmail.com", // generated ethereal user
      pass: "iiabmfviewjxmgrt", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Fred Foo 👻" <${data.senderEmail}>`, // sender address
    to: `${data.reciverEmail}`, // list of receivers
    subject: "New message", // Subject line
    text: data.message, // plain text body
    html: `<h2>You have received a message in Springworth Books</h2>`, // html body
  });

  res.status(200).json({ info });
}