const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  const data = req.body;
  const test = "iiabmfviewjxmgrt";
  const test2 = "neby scjs pbei mjwt";

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "noreply.springworthbooks@gmail.com", // generated ethereal user
      pass: "bbvh hors bgbq pxjm", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${data.senderEmail}`, // sender address
    to: `${data.reciverEmail}`, // list of receivers
    subject: "You have a new message in Springworth Books", // Subject line
    text: data.message, // plain text body
    html: ` 
    <div style="display: flex; justify-items: center;">
    <img style="width: 200px;" src="https://res.cloudinary.com/dtme6qv4c/image/upload/v1669535919/redone_spw_logo-removebg-preview.png" />
    </div>
    <p style="font-size: 2rem; margin-top: 2.5rem;">Hi ${data.reciverName}</p>
    <p style="font-size: 1.3rem; margin-bottom:2rem;">You have new message from ${data.senderName}</p>
    <a style="color: green; text-align: center;padding-left: 12px; padding-right: 12px;   padding-top: 10px; padding-bottom: 10px;          border-radius: 10px;          
       background-color: green;
    color: black;" href="https://springworth-eight.vercel.app/chats">View Message</a>
    <p style="margin-top: 2rem;">Do not reply to this automatically generated email, it is only to inform you.</p>
    `, // html body
  });

  res.status(200).json({ info });
}
