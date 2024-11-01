// pages/api/send-email.js
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    console.log("caleed");
    console.log(req)
  if (req.method !== 'POST') {
    console.log(req)
    return NextResponse(JSON.stringify({ message: 'Method not allowed' }),{status:405});
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
      const {to,subject,text} = await req.json();
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text:text,
    });
    return new NextResponse(JSON.stringify({ message: 'Email sent successfully' }),{status:200});
    
  } catch (error) {
    console.log(error)
    return new NextResponse(JSON.stringify({ message: 'Failed to send email' }),{status:200});
  }
}