export const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "abuaslamtech@gmail.com",
      pass: "ogjgysphuuepbugl",
    },
  });
};
