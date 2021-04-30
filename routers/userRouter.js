const router = require("express").Router();
const bcrypt = require("bcryptjs");

var admin = require("firebase-admin");
const firebase = require("firebase");
var db = admin.firestore();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  admin
    .auth()
    .createUser({ email, password })
    .then((userData) => {
      // Signed in
      const user = userData.user;
      console.log("userData", userData);
      console.log("passwordHAsh", passwordHash);

      admin
        .auth()
        .createCustomToken(userData.uid)
        .then(async (token) => {
          db.collection(`users`)
            .doc(`${userData.uid}`)
            .set({
              email: email,
              passwordHash: passwordHash,
              userrId: userData.uid,
            })
            .then((docRef) => {
              console.log("Document written with ID: ", docRef);
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
          console.log("token: ", token);

          res
            .cookie("token", token, {
              httpOnly: true,
              sameSite:
                process.env.NODE_ENV === "development"
                  ? "lax"
                  : process.env.NODE_ENV === "production" && "none",
              secure:
                process.env.NODE_ENV === "development"
                  ? false
                  : process.env.NODE_ENV === "production" && true,
            })
            .send();
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("error", error);
          res.status(500).send();
        });
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
});

router.get("/login", async (req, res) => {
  const { email, password } = req.body;

  // validate
  if (!email || !password)
    return res
      .status(400)
      .json({ errorMessage: "Please enter all required fields." });

  const existingUser = await admin.auth().getUserByEmail(email);
  if (!existingUser)
    return res.status(401).json({ errorMessage: "Wrong email or password" });
  console.log("---User Found---", existingUser.uid);

  db.collection("users")
    // .where("uid", "==", existingUser.uid)
    .doc(existingUser.uid)
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        await bcrypt
          .compare(password, doc.data().passwordHash)
          .then((result) => {
            if (result) {
              console.log("Authentication successful: ", result);
              // do stuff
            } else {
              console.log("Authentication failed. Password doesn't match");
              // do other stuff
            }
          })
          .catch((err) => console.error(err));
        // console.log("passwordCorrect", passwordCorrect);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .then(async () => {
      admin
        .auth()
        .createCustomToken(existingUser.uid)
        .then((token) => {
          res
            .cookie("token", token, {
              httpOnly: true,
              sameSite:
                process.env.NODE_ENV === "development"
                  ? "lax"
                  : process.env.NODE_ENV === "production" && "none",
              secure:
                process.env.NODE_ENV === "development"
                  ? false
                  : process.env.NODE_ENV === "production" && true,
            })
            .send();
        });
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
});

router.get("/logout", async (req, res) => {
  console.log("--Logout--");
  res
    .cookie("token", "", {
      httpOnly: true,
      sameSite:
        process.env.NODE_ENV === "development"
          ? "lax"
          : process.env.NODE_ENV === "production" && "none",
      secure:
        process.env.NODE_ENV === "development"
          ? false
          : process.env.NODE_ENV === "production" && true,
      expires: new Date(0),
    })
    .send();
  // Sign-out successful.
  console.log("Logged Out");
});
module.exports = router;
