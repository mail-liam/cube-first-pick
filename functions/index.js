const functions = require("firebase-functions")
const admin = require("firebase-admin")
const samplesize = require("lodash.samplesize")

admin.initializeApp()

exports.getPack = functions.https.onRequest((req, resp) => {
  let cube = req.query.cube
  resp.set("Access-Control-Allow-Origin", "*")

  return admin
    .database()
    .ref(`${cube}/contents`)
    .once("value")
    .then(snapshot => {
      if (snapshot.val) {
        let data = samplesize(snapshot.val(), 15)

        return resp.send(data)
      }
      return resp.send({ error: "No data found" })
    })
})
