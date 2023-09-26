import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hased token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    const alphanumericToken = hashedToken.replace(/[^a-zA-Z0-9]/g, "");
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, { verifyToken: alphanumericToken, verifyTokenExpiry: Date.now() + 3600000 });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: alphanumericToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "c88c7a0338a8eb",
        pass: "c7b403bc6092d0",
      },
    });

    const emailSubject = emailType === "VERIFY" ? "Verify your email" : "Reset your password";
    const emailLink =
      emailType === "VERIFY" ? `verifyemail?token=${alphanumericToken}` : `resetpassword?token=${alphanumericToken}`;

    const emailContent = `
<!DOCTYPE html>
<html>
<head>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td>
        <table align="center" width="600" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <table width="100%" cellpadding="20" cellspacing="0">
                <tr>
                  <td style="text-align: center; font-family: Arial, Helvetica, sans-serif;">
                    <p style="font-size: 16px; margin-bottom: 20px;">Hi User,</p>
                    <p style="font-size: 16px; margin-bottom: 20px;">You're almost set to start enjoying. Simply click the link below to ${
                      emailType === "VERIFY" ? "verify your email" : "reset your password"
                    } and get started. The link expires in 48 hours.</p>
                    <a href="${
                      process.env.DOMAIN
                    }/${emailLink}" style="display: inline-block; background-color: #eb4747; color: #fff; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; letter-spacing: 1px; text-decoration: none; text-transform: none; padding: 12px 24px; border-radius: 4px;">
                      ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    const mailOptions = {
      from: "utkarshk495@gmail.com",
      to: email,
      subject: emailSubject,
      html: emailContent,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
