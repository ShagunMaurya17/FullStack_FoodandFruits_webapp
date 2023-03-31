const router = require("express").Router();
const { auth, app } = require("firebase-admin");
const admin = require("firebase-admin");
let data = [];

router.get("/", (req, res) => {
  return res.send("inside the user rouete");
});

router.get("/jwtVerification", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ msg: "Token Not Found" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (!decodedValue) {
      return res
        .status(500)
        .json({ success: false, msg: "Unauthorised access" });
    }
    return res.status(200).json({ success: true, data: decodedValue });
  } catch (err) {
    return res.send({
      success: false,
      msg: `Error in extracting the token: ${err}`,
    });
  }
});

const listAllUsers = async (nextPageToken) => {
  // List batch of users, 1000 at a time.
  // using auth appp
  admin
    .auth()
    .listUsers(1000, nextPageToken)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((rec) => {
        data.push(rec.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch((error) => {
      console.log("Error listing users:", error);
    });
};
// Start listing users from the beginning, 1000 at a time.
listAllUsers();

router.get("/all", async (req, res) => {
  listAllUsers();
  try {
    return res
      .status(200)
      .send({ success: true, data: data, dataCount: data.lenght });
  } catch (error) {
    return res.send({
      success: false,
      msg: ` Error listing users: ${error}`,
    });
  }
});
module.exports = router;
