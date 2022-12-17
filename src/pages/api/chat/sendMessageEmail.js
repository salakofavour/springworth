const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  const data = req.body;

  const passw = "bbvh hors bgbq pxjm";
  const email = "noreply.springworthbooks@gmail.com";

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: email, // generated ethereal user
      pass: passw, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"SPRINGWORTH BOOKS" ${data.senderEmail}`, // sender address
    to: `${data.reciverEmail}`, // list of receivers
    subject: "You have a new message in Springworth Books", // Subject line
    text: data.message, // plain text body
    html: ` 

    <img style="width: 300px;" src="https://res.cloudinary.com/dtme6qv4c/image/upload/v1671267185/emailLogo.jpg" />

    <p style="font-size: 1.3rem; margin-top: 1rem;font-weight: semibold;">Hi ${data.reciverName},</p>
    <p style="font-size: 1.3rem; margin-bottom:2rem;  font-weight: semibold;">You have new message from ${data.senderName}.</p>
    <a style="color: white; text-align: center;padding-left: 12px; padding-right: 12px;   padding-top: 10px; padding-bottom: 10px; border-radius: 10px;          
       background-color: green;
    color: black;" href="https://springworth-eight.vercel.app/chats">View Message</a>
    <p style="margin-top: 4rem;">This is an automatically generated email. *** Please do not reply to this email ***</p>
    <p style="margin-top:1rem">If you wish to contact us, please Call (863)-210-7587, or email sworthcustomerservice@gmail.com</p>
    `, // html body
  });

  res.status(200).json({ info });
}
