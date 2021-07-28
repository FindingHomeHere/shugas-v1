import { htmlToText } from 'html-to-text';
import pug from 'pug';
import nodemailer from 'nodemailer';

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url || undefined;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: 'SendGrid',
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(`util/templates/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    const mailOptions = {
      from: `Shugas <${process.env.EMAIL_FROM}>`,
      to: this.to,
      subject,
      html,
      text: htmlToText(`${html}`),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendApplicationConfirmation() {
    await this.send('thanks', 'Thank you for submitting an application!');
  }

  async sendApplicationNotification() {
    await this.send('note', 'You recieved a new Application!');
  }

  async sendTeamWelcome() {
    await this.send('welcome', 'Welcome to the Shugas Team!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      '*Urgent* Password Reset link will expire in 10 minutes!'
    );
  }
}

export default Email;
