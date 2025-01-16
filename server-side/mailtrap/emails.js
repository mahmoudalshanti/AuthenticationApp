import { mailtrapClient, sender } from "./mailtrap.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

export async function sendVerificationEmail(email, verificationToken) {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "verification your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email verification",
    });

    console.log("Email send successfully", response);
  } catch (err) {
    throw new Error(`Error sending verification email: ${err}`);
  }
}

export async function sendWelcomeEmail(email, name) {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "b754d942-b823-40c1-9891-a226b485d43f",
      template_variables: {
        company_info_name: "Shopfaster",
        name: name,
      },
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    throw new Error(`Error sending welcome email: ${error}`);
  }
}

export async function sendPasswordRestEmail(email, resetURL) {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password reset",
    });
    console.log("Reset Password email sent successfully", response);
  } catch (err) {
    throw new Error(`Error sending password reset email: ${err}`);
  }
}

export async function sendResetSuccessEmail(email) {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
    console.log("Password reset email sent successfully", response);
  } catch (err) {
    throw new Error(`Error sending password reset email: ${err}`);
  }
}
