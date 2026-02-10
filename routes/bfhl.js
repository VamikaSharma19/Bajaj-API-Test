const express = require("express");
const router = express.Router();

const { fibonacci, isPrime, hcf, lcm } = require("../utils/math");
const askGemini = require("../utils/gemini");

router.post("/", async (req, res) => {
  try {
    const bodyKeys = Object.keys(req.body);
    if (bodyKeys.length !== 1) {
      return res.status(400).json({ is_success: false, error: "Invalid input"});
    }

    const key = bodyKeys[0];
    const value = req.body[key];

    let data;

    switch (key) {
      case "fibonacci":
        if (typeof value !== "number") throw "Invalid";
        data = fibonacci(value);
        break;

      case "prime":
        if (!Array.isArray(value)) throw "Invalid";
        data = value.filter(isPrime);
        break;

      case "lcm":
        data = lcm(value);
        break;

      case "hcf":
        data = hcf(value);
        break;
        
      case "AI":
        data = await askGemini(value);
        break;

      default:
        throw "Invalid key";
    }

    res.status(200).json({
      is_success: true,
      official_email: process.env.OFFICIAL_EMAIL,
      data
    });
  } catch (err) {
    res.status(400).json({
      is_success: false,
      error: "Invalid input"
    });
  }
});

module.exports = router;