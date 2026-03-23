import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// In-memory storage
const leads = [];

// Email setup (use your Gmail or SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post("/submit", async (req, res) => {
  const { name, phone, ref } = req.body;

  const lead = {
    name,
    phone,
    ref,
    time: new Date()
  };

  leads.push(lead);

  // 📩 Send Email
  await transporter.sendMail({
    from: "letmecodewithpeace@gmail.com",
    to: "letmecodewithpeace@gmail.com",
    subject: `New Lead from ${ref}`,
    text: `Name: ${name}\nPhone: ${phone}\nSource: ${ref}`
  });

  res.json({ message: "Lead captured & emailed" });
});

// 📊 Get all leads
app.get("/leads", (req, res) => {
  res.json(leads);
});

// 📊 Get stats per QR
app.get("/stats", (req, res) => {
  const stats = {};

  leads.forEach(l => {
    stats[l.ref] = (stats[l.ref] || 0) + 1;
  });

  res.json(stats);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


