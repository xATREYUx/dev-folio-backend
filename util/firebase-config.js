const admin = require("firebase-admin");

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAuawLH7q5EJpdZtLyNDwj3amHHVNWzM1s",
  authDomain: "dev-portfolio-backend.firebaseapp.com",
  projectId: "dev-portfolio-backend",
  storageBucket: "dev-portfolio-backend.appspot.com",
  messagingSenderId: "354306256620",
  appId: "1:354306256620:web:34e74191e42229f8deffc9",
};

var serviceAccount = {
  // type: "service_account",
  project_id: "dev-portfolio-backend",
  // private_key_id: "14ba32c8261589cf449ff545df86c95dc4b2ffd3",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCkY2Tlu1UwwLOk\nbu2WNbVJMxDHK/1FqK/q8UeEmbFzUBk2b3vZOsh7MlIYFhIwCnM+Rbi7JDXs0/Sm\nTduddpHQOyj98dFXMBjTuZ9btWTxHJNWwgzevPAyBEY4HB/J+dPy96TLy1ugVA1t\nXn9mEdAjY0/nLevsiw+/Uu7iWXapZY+U0zExu8G002dNuw70MvvukC7nmZgB86ai\ny2WRUXwItMjloRFpisJwKn7yRv96pfXL2EKaM4Df0C0IlPFzgtMhI2HJrbo5CtKk\nPByrl30umFeZs4CUUgEyRA0pgDdSkHasshGecHtkbuzLAw9AoCWCStnWv3KZvRaO\nfASaNqJTAgMBAAECggEAI+ENxJZ+oYVtsBYGBSLzzmY240HWpb2Lp9vBoE9rS5/P\n4PG0NlV+LGVvRZKLpbCiNpVBHJdqraYVX7bemB+o86n16Hc/GaiFwrBg98M/pOB3\nyBfSd0sFoeUM7nI0/gBpIj6q2VApT3UI+TYG2GBK7W5fojWDqL0xUrDnMsAUBiSq\n6Goq4oH86QrJ2GLVlUGM/RkKnB6Xb3K9lOWJZ/owdPAVGKOlerj47T3COR7D5YAH\nd9l/lbVo3RVLHDNNBTfKy6eQbm2WMeTsR6ataA+UaJipj/WdjRNAURkJgvzNwncu\njxj1ECUmjaqHHkESGIzhR6P0JAqIa6BeatlG6LKuAQKBgQDXssrbAKWkpMS0mJN2\nOPMLfUfp1hMgpcAs0iYNU4aDQhIDzkpYLIP7yeoXt+3dtwd3XT5YXeOfRWsyD0rM\nfMfTH7rdfYYNUWgRX92GS4P73FXN8mUBf9dMY4dPS2eVQn9gXxHo8bq5jq8686KL\nCpGssUSUni9hCi2GBUYshp+JaQKBgQDDGlp2CVbW/r0JIStbBUmilBwIjjXv8zat\ny2+KZdFoLtvcaoLbDqo37ybtZ5MHV+FEu+Y9AYUrJr2acijDKjAeTBqy3ahzpLdn\nsyKmJbbKMfRTF5JoH6H7vtIHPsVKc6EaxcJyZBRrl5c7tN44J8HW8iXYQ3fKuKNt\n+QlthIc6WwKBgQDO3+Q/d7dm2cDvlQaZdLVmZ5n5ZCCkR1SxqDxmu51fdpbgn5Ie\nT1OmwlmKthWleE3o5b1N837E20eck54h0eu1SdFnbWSMkW9GerN0gijr/r8s7zaA\n4aQU18CHBMMsHMMeIxCCYpW8MmVOHS3gPRrKjppAEBdQ8voGeDh9rACHQQKBgCzF\nXGLfy8S0Wi7BJNDTSs17DV/NOoVgm3iQSX1J1h8BOcS/0F1yZQ9G2vj5npy9xtzd\n/XycX7HCRxos/jui773UGwBWqzQ2ZTvvuJDF8Mc/ZWC39Qnd0G8Tn+C3v9BQ7nRV\nU0SqwKDb/YFfBOt//BRWJucUvGWRrzcqQcaW9e0nAoGAeZsFyhxqYNvyEVFhndoe\nFNclumBNW1G0wQyPHT88mAiWypVtM8WQIOd8yEp+ZVjnSd/u7j3qNV62+d6ibp4s\nsgKO3Cpnq+YTbPBnQUHQXMTxhgVStRwm2eSEGIzBMPAmQ5WoPQMNJkgXleHEl+L+\nWyyVNX26tWuP9YFDdiaN8bc=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-y4nsc@dev-portfolio-backend.iam.gserviceaccount.com",
  // client_id: "100441621612545542808",
  // auth_uri: "https://accounts.google.com/o/oauth2/auth",
  // token_uri: "https://oauth2.googleapis.com/token",
  // auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  // client_x509_cert_url:
  //   "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-y4nsc%40dev-portfolio-backend.iam.gserviceaccount.com",
};

const FB_ADMIN_CONFIG = {
  credential: admin.credential.cert(serviceAccount),

  storageBucket: "gs://dev-portfolio-backend.appspot.com",
};

module.exports = FIREBASE_CONFIG;
module.exports = FB_ADMIN_CONFIG;
