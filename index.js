const express = require("express");
const cors = require("cors");

var firebase = require("firebase/app");

require("firebase/auth");
require("firebase/firestore");

const app = express();

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAuawLH7q5EJpdZtLyNDwj3amHHVNWzM1s",
  authDomain: "dev-portfolio-backend.firebaseapp.com",
  projectId: "dev-portfolio-backend",
  storageBucket: "dev-portfolio-backend.appspot.com",
  messagingSenderId: "354306256620",
  appId: "1:354306256620:web:34e74191e42229f8deffc9",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

app.use(express.json());

app.use("/auth", require("./routers/userRouter"));
