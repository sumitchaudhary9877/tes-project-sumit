const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const products = [
  { id: 1, name: "Wireless Headphones", price: 2499, image: "https://placehold.co/400x300?text=Headphones" },
  { id: 2, name: "Mechanical Keyboard", price: 6999, image: "https://placehold.co/400x300?text=Keyboard" },
  { id: 3, name: "Smart Watch", price: 4599, image: "https://placehold.co/400x300?text=Watch" },
  { id: 4, name: "Bluetooth Speaker", price: 1999, image: "https://placehold.co/400x300?text=Speaker" },
  { id: 5, name: "Gaming Mouse", price: 1499, image: "https://placehold.co/400x300?text=Mouse" },
  { id: 6, name: "USB-C Hub", price: 2999, image: "https://placehold.co/400x300?text=USB+Hub" }
];


app.get("/api/products", (_, res) => {
  res.json(products);
});

// 🟢 Export it for Vercel
module.exports = app;


