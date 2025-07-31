import nodemailer from "nodemailer";

/**
 * Create a nodemailer transport using either OAuth2 or a plain password.
 */
function createTransport() {
  // If OAuth2 credentials are provided use them, otherwise fall back to a simple login
  const {
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
    GMAIL_REFRESH_TOKEN,
    GMAIL_USER,
    GMAIL_PASS,
  } = process.env;

  if (GMAIL_CLIENT_ID && GMAIL_CLIENT_SECRET && GMAIL_REFRESH_TOKEN && GMAIL_USER) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: GMAIL_USER,
        clientId: GMAIL_CLIENT_ID,
        clientSecret: GMAIL_CLIENT_SECRET,
        refreshToken: GMAIL_REFRESH_TOKEN,
      },
    });
  }

  if (GMAIL_USER && GMAIL_PASS) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });
  }

  throw new Error("Keine Gmail‑Konfigurationsdaten vorhanden");
}

/**
 * Send an itinerary email to the user with the supplied HTML content.
 *
 * @param to    The recipient email address
 * @param subject The email subject
 * @param html  The HTML body
 */
export async function sendItineraryEmail(options: { to: string; subject: string; html: string; }): Promise<void> {
  const transport = createTransport();
  await transport.sendMail({
    from: process.env.GMAIL_USER,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
}
