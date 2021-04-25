const router = require("express").Router();

var firebase = require("firebase/app");

router.post("/", async (req, res) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(req.body["email"], req.body["password"])
    .then((userData) => {
      // Signed in
      var user = userData.user;
      console.log("userData.user.uid", userData.user.uid);
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

router.get("/login", async (req, res) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(req.body["email"], req.body["password"])
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
  firebase
    .auth()
    .signOut()
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
