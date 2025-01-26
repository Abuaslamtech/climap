import { v4 as uuidv4 } from "uuid";
import { createTransporter } from "./emailTransporter.utils.js";

// generate reset token
const generateToken = () => {
  return uuidv4();
};

// send reset email
const sendPasswordResetEmail = async (email, resetLink) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Climap" <abuaslamtech@gmail.com>`,
      to: email,
      subject: "Climap Password Reset",
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #F8F9FA; padding: 24px; border-radius: 12px;">
  <div style="background-color: #2E7D32; color: white; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
    <h2 style="margin: 0; font-size: 24px;">Password Reset Request</h2>
  </div>

  <div style="padding: 0 20px; color: #333;">
    <p style="line-height: 1.6;">You have requested to reset your password for <strong>Climap</strong>.</p>
    <p style="line-height: 1.6;">Click the button below to reset your password:</p>

    <div style="text-align: center; margin: 24px 0;">
      <a href="${resetLink}" style="
        display: inline-block;
        padding: 12px 24px;
        background-color: #388E3C;
        color: white;
        text-decoration: none;
        border-radius: 8px;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: background-color 0.3s;
      ">Reset Password</a>
    </div>

    <div style="background-color: #E8F5E9; padding: 16px; border-radius: 8px; margin: 20px 0;">
      <p style="line-height: 1.6; color: #666; margin: 0;">
        <span style="color: #EF6C00; font-weight: bold;">Security Note:</span>
        If you did not request this password reset, please contact our
        <a href="https://climap.ng/support" style="color: #2E7D32; text-decoration: underline;">support team</a> immediately.
      </p>
    </div>

    <small style="color: #888; display: block; text-align: center; margin-top: 20px;">
      This link will expire in 1 hour.
    </small>

    <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #EEE;">
      <small style="color: #666;">
        Need help? Contact
        <a href="mailto:support@climap.ng" style="color: #2E7D32; text-decoration: none;">support@climap.ng</a>
      </small>
    </div>
  </div>
</div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
export { generateToken, sendPasswordResetEmail };
