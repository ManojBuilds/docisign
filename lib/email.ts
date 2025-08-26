// lib/email.ts
interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  // Using a service like Resend, SendGrid, or similar
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Docisign <noreply@mail.heysheet.in>',
      to: [to],
      subject,
      html,
    }),
  });

  return response.json();
}

export const emailTemplates = {
  trialReminder3Days: (name: string) => ({
    subject: "3 days left in your Docisign trial",
    html: `
      <h2>Hi ${name},</h2>
      <p>Your Docisign trial expires in 3 days.</p>
      <p>Don't lose access to your documents - upgrade to Pro for just $12/month.</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/upgrade" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Upgrade Now</a>
    `,
  }),

  trialReminder1Day: (name: string) => ({
    subject: "Your Docisign trial expires tomorrow",
    html: `
      <h2>Hi ${name},</h2>
      <p>This is your final reminder - your Docisign trial expires tomorrow.</p>
      <p>Upgrade now to keep your documents and continue using Docisign.</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/upgrade" style="background-color: #dc3545; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Upgrade Now</a>
    `,
  }),

  welcome: (name: string) => ({
    subject: "Welcome to Docisign Pro!",
    html: `
      <h2>Welcome ${name}!</h2>
      <p>Thank you for upgrading to Docisign Pro. You now have access to:</p>
      <ul>
        <li>Unlimited documents</li>
        <li>All file formats</li>
        <li>Priority support</li>
      </ul>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">Get Started</a>
    `,
  }),
};
