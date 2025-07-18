const { connections } = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PhoneNumberUtil } = require("google-libphonenumber");
const phoneUtil = PhoneNumberUtil.getInstance();
const upload = require("../middleware/upload");
const xss = require("xss");
const nodemailer = require('nodemailer')
const validator = require("validator");

// Helper: Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Helper: Send OTP Email
const sendOTPEmail = async (email, otp) => {
  console.log("Preparing to send OTP email to:", email);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`,
  };

  try {
    console.log("Sending email with OTP:", otp);
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    return true;
  } catch (err) {
    console.error("❌ Error sending OTP email:", err);
    return false;
  }
};



// ====================== GET ALL USERS ====================== //
exports.getAllUsers = async (req, res) => {
  console.log("🔍 Starting to fetch all users...");

  try {
    const User = connections.app.model("User");
    const users = await User.find().select("-password -otp -otpExpires"); // hide sensitive info

    console.log("✅ Successfully fetched users:", users.length);
    res.json({ users });
  } catch (err) {
    console.error("❌ Get All Users Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


// ====================== REGISTER ====================== //
// Dummy function for preferredCurrency logic


exports.registerUser = async (req, res) => {
  console.log("📥 Received registration request.");

  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      console.log("❌ Request body is empty.");
      return res.status(400).json({ msg: "Request body is empty" });
    }

    const {
      name = "",
      email = "",
      password = "",
      phone = "",
      address = {},
      role = "customer",
      cart = [],
      orders = [],
    } = req.body;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone.toString().trim();

    if (!trimmedName || !trimmedEmail || !password) {
      console.log("❌ Missing required fields.");
      return res.status(400).json({ msg: "Name, email, and password are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      console.log("❌ Invalid email format.");
      return res.status(400).json({ msg: "Invalid email format" });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      console.log("❌ Weak password.");
      return res.status(400).json({
        msg: "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.",
      });
    }

    try {
      const parsedPhone = phoneUtil.parse(trimmedPhone, "NG");
      if (!phoneUtil.isValidNumber(parsedPhone)) {
        console.log("❌ Invalid phone number.");
        return res.status(400).json({ msg: "Invalid phone number" });
      }
    } catch {
      console.log("❌ Invalid phone number format.");
      return res.status(400).json({ msg: "Invalid phone number format" });
    }

    if (typeof address !== "object") {
      console.log("❌ Address is not an object.");
      return res.status(400).json({ msg: "Address must be an object" });
    }

    const {
      street = "",
      city = "",
      state = "",
      zip = "",
      country = "",
    } = address;

    const sanitizedName = xss(validator.escape(trimmedName));
    const sanitizedEmail = xss(validator.normalizeEmail(trimmedEmail));
    const sanitizedPhone = xss(validator.blacklist(trimmedPhone, "<>\"'"));
    const sanitizedAddress = {
      street: xss(validator.escape(street.trim())),
      city: xss(validator.escape(city.trim())),
      state: xss(validator.escape(state.trim())),
      zip: xss(validator.escape(zip.trim())),
      country: xss(validator.escape(country.trim())),
    };

    if (
      sanitizedEmail.includes("javascript:") ||
      sanitizedName.includes("<script")
    ) {
      console.log("❌ Malicious script detected in input.");
      return res.status(400).json({ msg: "Invalid content detected" });
    }

    const User = connections.app.model("User");
    const existingUser = await User.findOne({ email: sanitizedEmail });

    if (existingUser) {
      console.log("❌ User already exists:", sanitizedEmail);
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const preferredCurrency = await upload.getPreferredCurrency(req);

    const newUser = await User.create({
      name: sanitizedName,
      email: sanitizedEmail,
      password: hashedPassword,
      phone: sanitizedPhone,
      address: sanitizedAddress,
      preferredCurrency,
      cart,
      orders,
      role,
    });

    console.log("✅ New user registered:", sanitizedEmail);

    newUser.password = undefined;

    res.status(201).json({
      success: true,
      msg: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    console.log("❌ Register Error:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};


// ====================== UPDATE USER ====================== //
exports.updateUser = async (req, res) => { 
  console.log("📥 Received update request for user.");

  try {
    const { id } = req.params;
    const updates = req.body;

    console.log("🔧 Updating user with ID:", id);
    console.log("📝 Update data:", updates);

    const User = connections.app.model("User");
    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select("-password");

    if (!user) {
      console.log("❌ User not found with ID:", id);
      return res.status(404).json({ msg: "User not found" });
    }

    console.log("✅ User updated successfully:", user._id);
    res.json({ msg: "User updated successfully", user });
  } catch (err) {
    console.error("❌ Update User Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};



// ====================== LOGIN ====================== //

// LOGIN
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("📥 Login attempt with email:", email);

  try {
    const User = connections.app.model("User");
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Invalid password for email:", email);
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ If verified, send token
    if (user.isVerified) {
      console.log("✅ User is verified. Generating token...");
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      console.log("✅ Login successful for user:", user.email);
      return res.json({
        message: "Login successful",
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    }

    // ❌ If not verified, send OTP
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    await user.save();
    console.log("ℹ️ User not verified. OTP generated and saved:", otp);

    const emailSent = await sendOTPEmail(user.email, otp);
    if (!emailSent) {
      console.log("❌ Failed to send OTP email to:", user.email);
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    console.log("📨 OTP sent to email:", user.email);
    return res.json({ message: "OTP sent to email", otpRequired: true });

  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// VERIFY OTP
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  console.log(`🔐 Incoming OTP verification for email: ${email}`);

  try {
    const User = connections.app.model("User");
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found during OTP verification");
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      console.log("❌ Invalid OTP entered");
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (Date.now() > user.otpExpires) {
      console.log("⏰ OTP expired");
      return res.status(400).json({ message: "Expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    console.log("✅ OTP verified, user marked as verified and saved");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log("🔑 Token generated after successful OTP verification");
    return res.json({
      message: "OTP verified successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("🚨 OTP Verification Error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};




// ====================== DELETE USER ====================== //
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const User = connections.app.model("User");
    const user = await User.findByIdAndDelete(id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error("Delete User Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


exports.deleteAllUsers = async (req, res) => {
  try {
    const User = connections.app.model("User");
    const result = await User.deleteMany({}); // Deletes all users

    res.json({ msg: "All users deleted", deletedCount: result.deletedCount });
  } catch (err) {
    console.error("Delete All Users Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


exports.editBodyMeasurements = async (req, res) => {
  const { userId } = req.params;
  const {
    height,
    weight,
    shoulder,
    chest,
    waist,
    hip,
    inseam,
    armLength,
    sleeveLength,
    wrist,
    thigh,
    knee,
    calf,
    ankle,
    unit
  } = req.body;

  try {
    const User = connections.app.model("User");
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.bodyMeasurements = {
      height,
      weight,
      shoulder,
      chest,
      waist,
      hip,
      inseam,
      armLength,
      sleeveLength,
      wrist,
      thigh,
      knee,
      calf,
      ankle,
      unit
    };

    await user.save();

    res.json({ msg: "Body measurements updated successfully" });
  } catch (err) {
    console.error("Error updating body measurements:", err);
    res.status(500).json({ msg: "Server error" });
  }
};