import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import authRoutes from './routes/auth.Route.js';
import './config/passport.js';
import mongoose from 'mongoose';

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
});

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.json());
app.use(passport.initialize());
app.use("/auth", authRoutes);
app.get("/", (req, res) => { res.send("Hello World") })

app.listen(process.env.PORT, () => { console.log(`Server is running on port ${process.env.PORT}`) });