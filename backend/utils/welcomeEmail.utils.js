export const sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Climap Team" <climap@gmail.com>`,
      to: email,
      subject: "Welcome to Climap - Your Healthcare Mapping Journey Begins!",
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #F8F9FA; padding: 24px; border-radius: 12px;">
  <div style="background-color: #1E3A8A; color: white; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
    <h2 style="margin: 0; font-size: 24px;">🌟 Welcome to Climap, ${name}! 🌟</h2>
  </div>

  <div style="padding: 0 20px; color: #333;">
    <p style="line-height: 1.6;">Hi ${name},</p>
    <p style="line-height: 1.6;">Thank you for joining Climap, your gateway to Nigeria's comprehensive healthcare facility database! We're excited to have you on board.</p>

    <div style="text-align: center; margin: 24px 0;">
      <a href="https://cli-map.vercel.app" style="
        display: inline-block;
        padding: 12px 24px;
        background-color: #1E3A8A;
        color: white;
        text-decoration: none;
        border-radius: 8px;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      ">Get Started Now</a>
    </div>

    <div style="background-color: #EFF6FF; padding: 16px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #1E3A8A; margin-top: 0;">Quick Start Guide:</h3>
      <ul style="line-height: 1.6; padding-left: 20px;">
        <li>🔍 Search 40,000+ verified healthcare facilities</li>
        <li>📌 Save your favorite locations</li>
        <li>➕ Contribute new facilities (after verification)</li>
        <li>🗺️ Access interactive maps with directions</li>
      </ul>
    </div>

    <p style="line-height: 1.6;">Need help getting started? Our <a href="https://climap.ng/support" style="color: #1E3A8A; text-decoration: underline;">support team</a> is always here to assist you!</p>

    <p style="line-height: 1.6;">Best regards,<br>
    <strong>The Climap Team</strong></p>

    <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #EEE;">
      <small style="color: #666;">
        Follow us:
        <a href="https://twitter.com/climap" style="color: #1E3A8A; text-decoration: none; margin: 0 8px;">Twitter</a> |
        <a href="https://facebook.com/climap" style="color: #1E3A8A; text-decoration: none; margin: 0 8px;">Facebook</a> |
        <a href="https://linkedin.com/company/climap" style="color: #1E3A8A; text-decoration: none; margin: 0 8px;">LinkedIn</a>
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
