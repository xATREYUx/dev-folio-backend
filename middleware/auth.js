const firebase = require("firebase");
var admin = require("firebase-admin");
const FIREBASE_CONFIG = require("../util/firebase-config").default;

const authChk = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      console.log("decodedToken: ", decodedToken);

      const varified = decodedToken.uid;
      req.user = varified;
      next();
      // console.log("authorized: ", uid);
    })
    .catch((error) => {
      console.log("authorized error: ", error);
    });
};
module.exports = authChk;
