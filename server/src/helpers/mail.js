import { config } from 'dotenv';
import nodemailer from 'nodemailer';
import logger from './logger';

config();
const { EMAIL, PASS, FRONT_URL } = process.env;
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: EMAIL,
    pass: PASS,
  },
});

const sendEmail = (type, data = {}) => {
  try {
    const mail = {
      from: '"noreply - RedJanvier" <noreply@redjanvier.netlify.app>',
      to: data.email,
      subject: type,
    };

    switch (type) {
      case 'New Blog post':
        mail.html = `<b>Dear Subscriber at RedJanvier,</b> <p>${data.title} is a new post from our blog you can click the link below...</p> <p><a href='${FRONT_URL}/blog/${data.blogId}'>click here to view post</a></p>`;
        break;
      default:
        mail.html = '<p>Test Email</p>';
    }

    const info = transporter.sendMail(mail);
    logger.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    logger.error(error);
  }
};

export default sendEmail;
