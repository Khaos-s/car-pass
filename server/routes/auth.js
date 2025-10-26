import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Email transporter setup (configure with your email service)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Register endpoint
router.post("/register", async (req, res) => {
  const db = req.app.locals.db;
  let connection;

  try {
    const {
      school_Id,
      firstName,
      lastName,
      email,
      password,
      studentId,
      role,
      secretCode,
      department,
      course,
    } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password || !studentId) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Validate admin secret code if role is admin
    if (role === "admin") {
      const ADMIN_SECRET = process.env.ADMIN_SECRET_CODE || "PHINMA2024";
      if (secretCode !== ADMIN_SECRET) {
        return res.status(403).json({
          success: false,
          message: "Invalid admin secret code",
        });
      }
    }

    connection = await db.getConnection();

    // Check if email already exists
    const [existingUsers] = await connection.execute(
      "SELECT id FROM users WHERE email = ?",
      [email.toLowerCase().trim()]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Map role to schema format
    let userRole = "student";
    if (role === "admin") {
      userRole = "admin";
    } else if (role === "faculty") {
      userRole = "faculty";
    } else if (role === "visitor") {
      userRole = "visitor";
    }

    // Create full name
    const fullName = `${firstName} ${lastName}`;

    // Insert user
    const userId = uuidv4();
    await connection.execute(
      `INSERT INTO users (
                id, email, password_hash, name, role, 
                contact_number, department, email_verified, verification_token, is_active
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        email.toLowerCase().trim(),
        passwordHash,
        fullName,
        userRole,
        studentId,
        department || course || null,
        false,
        verificationToken,
        true,
      ]
    );

    // Create verification link
    const verificationLink = `${
      process.env.FRONTEND_URL || "http://localhost:3000"
    }/verify-email/${verificationToken}`;

    // Send verification email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify Your PHINMA Parking Account",
        html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px;">
                        <h2>Welcome to PHINMA Parking Management System!</h2>
                        <p>Hello ${fullName},</p>
                        <p>Thank you for registering. Please verify your email address by clicking the link below:</p>
                        <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
                        <p>Or copy and paste this link into your browser:</p>
                        <p>${verificationLink}</p>
                        <p>This link will expire in 24 hours.</p>
                        <p>If you didn't create this account, please ignore this email.</p>
                        <br>
                        <p>Best regards,<br>PHINMA Parking Management Team</p>
                    </div>
                `,
      });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
    }

    res.status(201).json({
      success: true,
      message:
        "Registration successful! Please check your email to verify your account.",
      verificationLink:
        process.env.NODE_ENV === "development" ? verificationLink : undefined,
      data: {
        userId,
        email: email.toLowerCase().trim(),
        name: fullName,
        role: userRole,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  } finally {
    if (connection) connection.release();
  }
});

export default router;
