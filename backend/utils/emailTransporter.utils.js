import nodemailer from "nodemailer";

// Export the transporter creation function
export const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "abuaslamtech@gmail.com",
      pass: "ogjgysphuuepbugl",
    },
  });
};
