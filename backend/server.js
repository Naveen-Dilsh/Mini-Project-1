import express from 'express';
import dotenv from 'dotenv'
dotenv.config()


import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 5000

import authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"
import paymentRoutes from "./routes/payment.route.js"

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use('/api/auth', authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/payment",paymentRoutes)

app.listen(PORT, () =>{
    console.log("Server running on http://localhost:"+ PORT)
    connectDB();
})

//naveen
//zeMltnJFcNO64Vgs