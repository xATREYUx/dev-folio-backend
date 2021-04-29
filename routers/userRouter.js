const router = require("express").Router();

var admin = require("firebase-admin");
// const firebase = require("firebase");
// var db = firebase.firestore();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  admin
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userData) => {
      // Signed in
      var user = userData.user;
      console.log("userData.user.email", userData.user.email);
      // Get Token
      admin
        .auth()
        .currentUser.getIdToken(true)
        .then((idtoken) => {
          console.log("token: ", idtoken);
          res
            .cookie("token", idtoken, {
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
      db.collection("users")
        .add({
          email: email,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    });
});

router.get("/login", async (req, res) => {
  const { email, password } = req.body;

  // validate
  if (!email || !password)
    return res
      .status(400)
      .json({ errorMessage: "Please enter all required fields." });

  admin
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userData) => {
      // Signed in
      var user = userData.user;
      var accessToken = userData.user;
      console.log("Signed in user: ", user.uid + ", " + accessToken);
      // Get Token
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then((idtoken) => {
          console.log("token: ", idtoken);
          res
            .cookie("token", idtoken, {
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
    });
});

router.get("/logout", async (req, res) => {
  console.log("--Logout--");

  admin
    .auth()
    .revokeRefreshTokens()
    .then(() => {
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
      console.log("Logged Out ");
    })
    .catch((error) => {
      // An error happened.
    });
});
module.exports = router;
