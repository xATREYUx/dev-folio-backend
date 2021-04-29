const router = require("express").Router();
const bcrypt = require("bcryptjs");

var admin = require("firebase-admin");
const firebase = require("firebase");
var db = admin.firestore();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  admin
    .auth()
    .createUser({ email, password })
    .then((userData) => {
      // Signed in
      const user = userData.user;
      console.log("userData", userData);
      admin
        .auth()
        .createCustomToken(userData.uid)
        .then((token) => {
          db.collection("users")
            .add({
              email: email,
              passwordHash: password,
              userId: userData.uid,
            })
            .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
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

      // Get Token
      //   admin
      //     .auth()
      //     .currentUser.getIdToken(true)
      //     .then((idtoken) => {
      //       console.log("token: ", idtoken);
      //       res
      //         .cookie("token", idtoken, {
      //           httpOnly: true,
      //           sameSite:
      //             process.env.NODE_ENV === "development"
      //               ? "lax"
      //               : process.env.NODE_ENV === "production" && "none",
      //           secure:
      //             process.env.NODE_ENV === "development"
      //               ? false
      //               : process.env.NODE_ENV === "production" && true,
      //         })
      //         .send();
      //     })
      //     .catch((error) => {
      //       var errorCode = error.code;
      //       var errorMessage = error.message;
      //       console.log("error", error);
      //       res.status(500).send();
      //     });
      //   db.collection("users")
      //     .add({
      //       email: email,
      //     })
      //     .then((docRef) => {
      //       console.log("Document written with ID: ", docRef.id);
      //     })
      //     .catch((error) => {
      //       console.error("Error adding document: ", error);
      //     });
    });
});

router.get("/login", async (req, res) => {
  const { email, password } = req.body;

  // validate
  if (!email || !password)
    return res
      .status(400)
      .json({ errorMessage: "Please enter all required fields." });

  const existingUser = admin.auth().getUserByEmail(email);
  if (!existingUser)
    return res.status(401).json({ errorMessage: "Wrong email or password" });

  const passwordCorrect = await bcrypt.compare(password, existingUser.password);
  if (!passwordCorrect)
    return res.status(401).json({ errorMessage: "Wrong email or password" });

  // admin
  //   .auth()
  //   .signInWithEmailAndPassword(email, password)
  //   .then((userData) => {
  //     // Signed in
  //     var user = userData.user;
  //     var accessToken = userData.user;
  //     console.log("Signed in user: ", user.uid + ", " + accessToken);
  //     // Get Token
  //     admin
  //       .auth()
  //       .currentUser.getIdToken(true)
  //       .then((idtoken) => {
  //         console.log("token: ", idtoken);
  //         res
  //           .cookie("token", idtoken, {
  //             httpOnly: true,
  //             sameSite:
  //               process.env.NODE_ENV === "development"
  //                 ? "lax"
  //                 : process.env.NODE_ENV === "production" && "none",
  //             secure:
  //               process.env.NODE_ENV === "development"
  //                 ? false
  //                 : process.env.NODE_ENV === "production" && true,
  //           })
  //           .send();
  //       })
  //       .catch((error) => {
  //         var errorCode = error.code;
  //         var errorMessage = error.message;
  //         console.log("error", error);
  //         res.status(500).send();
  //       });
  //   });
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
