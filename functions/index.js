/* jshint esversion: 6 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(JSON.stringify(serviceAccount))),
});

// Initialize Database
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

exports.helloWorld = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  if (uid) {
    const message = "Hello " + data + "!";
    return message;
  }
});

exports.getIndividualShoppingListItems = functions.https.onCall(
  async (data, context) => {
    const userId = context.auth.uid;
    if (userId) {
      const docList = [];
      const result = await db
        .collection("IndividualShoppingListItems")
        .where("uid", "==", userId)
        .get();
      result.forEach((doc) => {
        const fullDoc = doc.data();
        fullDoc._id = doc.id;
        docList.push(fullDoc);
      });
      return docList;
    }
  }
);

exports.addIndividualShoppingListItem = functions.https.onCall(
  async (data, context) => {
    const userId = context.auth.uid;
    if (userId) {
      data.uid = userId;
      await db.collection("IndividualShoppingListItems").add(data);
    }
  }
);

exports.deleteIndividualShoppingListItem = functions.https.onCall(
  async (data, context) => {
    const userId = context.auth.uid;
    if (userId) {
      await db.collection("IndividualShoppingListItems").doc(data).delete();
    }
  }
);

exports.editIndividualShoppingListItem = functions.https.onCall(
  async (data, context) => {
    const userId = context.auth.uid;
    if (userId) {
      await db
        .collection("IndividualShoppingListItems")
        .doc(data.id)
        .update(data.document);
    }
  }
);

exports.addUser = functions.https.onCall(async (data, context) => {
  const userId = context.auth.uid;
  if (userId) {
    data.uid = userId;
    await db.collection("Users").doc(userId).set(data);
  }
});

exports.getUser = functions.https.onCall(async (data, context) => {
  const userId = context.auth.uid;
  if (userId) {
    console.log(data);
    const result = await db
      .collection("Users")
      .doc(userId)
      .get();
    return result.data();
  }
});

exports.editUser = functions.https.onCall(async (data, context) => {
  const userId = context.auth.uid;
  if (userId) {
    await db.collection("Users").doc(userId).update(data);
  }
});