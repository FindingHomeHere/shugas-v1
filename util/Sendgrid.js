import sgMail from '@sendgrid/mail';

const sendEmails = async ({ name, email }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const emails = [
    {
      to: email,
      from: process.env.EMAIL_FROM,
      subject: "Thank you for Applying to Shuga's",
      templateId: process.env.EMAIL_TO_APPLICANT,
      dynamicTemplateData: {
        name: name.split(' ')[0],
      },
    },
    {
      to: process.env.EMAIL_KEVIN,
      from: process.env.EMAIL_FROM,
      subject: process.env.EMAIL_TO_KEVIN,
      templateId: 'd-8295557f6f164593bcf2a702e509a41d', // Sends to KEVIN!!!
      dynamicTemplateData: {
        applicantName: name,
      },
    },
  ];
  await sgMail
    .send(emails)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
};

export default sendEmails;
