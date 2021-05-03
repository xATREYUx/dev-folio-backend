const express = require("express");
const dotenv = require("dotenv");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const admin = require("firebase-admin");
var serviceAccount = require("./creds.json");

// const FIREBASE_CONFIG = require("./util/firebase-config");
// const FB_ADMIN_CONFIG = require("./util/firebase-config");
// const firebase = require("firebase");
require("firebase/auth");
require("firebase/firestore");

dotenv.config();

const app = express();

// Initialize Firebase
// firebase.initializeApp(FIREBASE_CONFIG);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://devport-express-backend.firebaseio.com",
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

app.use(express.json());
app.use(cookieParser());

app.use("/auth", require("./routers/userRouter"));
app.use("/post", require("./routers/postRouter"));
