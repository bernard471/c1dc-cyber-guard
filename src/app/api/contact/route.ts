import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Store this in .env
      pass: process.env.EMAIL_PASSWORD // Store this in .env
    }
  });

  const mailOptions = {
    from: email,
    to: 'c1dcreports@gmail.com',
    subject: `Contact Form: ${subject}`,
    text: `
      Name: ${name}
      Email: ${email}
      
      Message:
      ${message}
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
