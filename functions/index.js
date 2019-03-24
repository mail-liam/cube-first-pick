const functions = require("firebase-functions")
const admin = require("firebase-admin")
const samplesize = require("lodash.samplesize")

admin.initializeApp()

exports.getPack = functions.https.onRequest((req, resp) => {
  let cube = req.query.cube

  let ref = admin.database().ref(`${cube}/contents`)

  return ref.once("value").then(snapshot => {
    if (snapshot.val) {
      let contents = snapshot.val()
      let cards = samplesize(Object.keys(contents), 15)
      let data = {}

      cards.forEach(key => {
        data[key] = contents[key]
      })

      return resp.send(data)
    }
    return resp.send({ error: "No data found" })
  })
})
