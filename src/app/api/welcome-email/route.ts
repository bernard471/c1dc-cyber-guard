import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email } = await request.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to CyberGuard!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0466c8;">Welcome to CyberGuard, ${name}!</h2>
        <p>Thank you for joining our platform dedicated to cybercrime reporting and prevention.</p>
        <p>With CyberGuard, you can:</p>
        <ul>
          <li>Report cybercrimes securely</li>
          <li>Track your case progress</li>
          <li>Access educational resources</li>
          <li>Get immediate support when needed</li>
        </ul>
        <p>If you need any assistance, our support team is here to help!</p>
        <div style="margin-top: 20px;">
          <a href="[your-platform-url]" style="background-color: #0466c8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Get Started</a>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
    console.error(error);
  }
}
