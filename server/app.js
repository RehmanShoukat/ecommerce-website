const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Stripe = require("stripe");

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

console.log("Stripe secret key loaded:", process.env.STRIPE_SECRET_KEY);

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ STRIPE_SECRET_KEY is missing in your .env file!");
  process.exit(1); // Stop the server if key is missing
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Stripe checkout session route
app.post("/create-checkout-session", async (req, res) => {
  try {
    console.log("✅ Received request body:", req.body);

    const lineItems = req.body.cartItems.map((item) => {
      console.log("🔹 Mapping item:", item);

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title || "Untitled Product",
            ...(item.image && item.image.startsWith("http") && {
              images: [item.image],
            }),
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    console.log("✅ Stripe session created:", session.id);
    res.json({ id: session.id });
  } catch (err) {
    console.error("❌ Stripe session creation failed:", err.message);
    res.status(500).json({ error: "Stripe error", message: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
