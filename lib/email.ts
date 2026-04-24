import { Resend } from "resend";
import { config } from "@/config";

export async function sendWaitlistEmail(to: string, discountCode: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    throw new Error("Resend not configured");
  }

  const resend = new Resend(apiKey);
  const { discountPercent } = config.waitlist;
  const brand = config.brandName;

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#F6F3EE;font-family:Georgia,'Times New Roman',serif;color:#1A1A1A;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6F3EE;padding:48px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;padding:40px;border:1px solid #E8E3DB;">
            <tr><td>
              <p style="margin:0 0 24px;font-size:14px;letter-spacing:0.2em;text-transform:uppercase;color:#6B6660;">${brand}</p>
              <h1 style="margin:0 0 24px;font-size:28px;font-weight:normal;line-height:1.2;">You're on the list.</h1>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#1A1A1A;">
                Thanks for joining ${brand}. When we launch, you'll be first in line to rent archive pieces from the people who own them.
              </p>
              <p style="margin:0 0 12px;font-size:14px;color:#6B6660;">Your early-access code:</p>
              <p style="margin:0 0 24px;font-family:'Courier New',monospace;font-size:22px;letter-spacing:0.1em;padding:16px;background:#F6F3EE;text-align:center;">${discountCode}</p>
              <p style="margin:0 0 32px;font-size:14px;line-height:1.6;color:#1A1A1A;">
                Good for ${discountPercent}% off your first rental when we launch.
              </p>
              <p style="margin:0;font-size:12px;line-height:1.5;color:#6B6660;">
                Want off the list? Reply to this email with "remove".
              </p>
            </td></tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = `You're on the list.

Thanks for joining ${brand}. When we launch, you'll be first in line to rent archive pieces from the people who own them.

Your early-access code: ${discountCode}

Good for ${discountPercent}% off your first rental when we launch.

Want off the list? Reply with "remove".`;

  await resend.emails.send({
    from,
    to,
    subject: config.email.subject,
    html,
    text,
  });
}
