const express = require("express");
const router = express.Router();
const { connections } = require("../config/db");

router.post("/", async (req, res) => {
  const { email } = req.body;

  try {
    console.log("📥 Subscription attempt for:", email);

    if (!email || !email.includes("@")) {
      console.warn("❌ Invalid email received:", email);
      return res.status(400).json({ message: "Valid email is required" });
    }

    const EmailOnly = connections.app.model("EmailOnly");
    const existing = await EmailOnly.findOne({ email });

    if (existing) {
      console.warn("⚠️ Email already subscribed:", email);
      return res.status(409).json({ message: "Email already subscribed" });
    }

    await EmailOnly.create({ email });
    console.log("✅ Email subscribed successfully:", email);
    res.json({ message: "Subscribed successfully!" });

  } catch (err) {
    console.error("❌ Subscription error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;