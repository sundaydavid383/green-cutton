const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    phone: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
      country: { type: String },
    },
    bodyMeasurements: {
  height: { type: Number }, // Total height
  weight: { type: Number }, // Total weight
  shoulder: { type: Number }, // Across the back, from one shoulder tip to the other
  chest: { type: Number }, // Around the torso, at the fullest part of the chest
  waist: { type: Number }, // Around the narrowest part of the natural waistline
  hip: { type: Number }, // Around the fullest part of the hips, usually 7-9 inches below the waistline
  inseam: { type: Number }, // From the top of the inner thigh to the ankle
  armLength: { type: Number }, // From the shoulder tip, over the elbow, to the wrist
  sleeveLength: { type: Number }, // From the shoulder tip to the desired length of the sleeve
  wrist: { type: Number }, // Around the wrist
  thigh: { type: Number }, // Around the fullest part of the thigh
  knee: { type: Number }, // Around the knee
  calf: { type: Number }, // Around the fullest part of the calf
  ankle: { type: Number }, // Around the ankle
  unit: { type: String, enum: ["cm", "in"] }
},
     otp: String,
    otpExpires: Date,
    role: {
      type: String,
      enum: ["customer", "admin", "designer"],
      default: "customer",
    },
    isVerified: { type: Boolean, default: false },
    profileImage: { type: String },
    preferredCurrency: {
      type: String,
      enum: ["NGN", "USD"],
      default: "NGN",
    },
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        customOptions: { type: Object },
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    notifications: [
      {
        message: { type: String },
        read: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Export the schema itself to register in a specific connection
module.exports = userSchema;