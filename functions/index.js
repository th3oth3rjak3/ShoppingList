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
    const filter = data.filter;
    if (userId) {
      const docList = [];
      let result;
      if (filter) {
        result = await db
          .collection("IndividualShoppingListItems")
          .where("uid", "==", userId)
          .where("list", "==", filter)
          .get();
      } else {
        result = await db
          .collection("IndividualShoppingListItems")
          .where("uid", "==", userId)
          .get();
      }

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
      const newDoc = db.collection("IndividualShoppingListItems").doc();
      data._id = newDoc.id;
      await newDoc.set(data);
    }
  }
);

exports.deleteIndividualShoppingListItems = functions.https.onCall(
  async (data, context) => {
    const userId = context.auth.uid;
    if (userId) {
      data.forEach(
        async (item) =>
          await db.collection("IndividualShoppingListItems").doc(item).delete()
      );
    }
  }
);

exports.editIndividualShoppingListItem = functions.https.onCall(
  async (data, context) => {
    const userId = context.auth.uid;
    if (userId) {
      const documentData = {
        category: data.category,
        name: data.name,
        list: data.list,
      };
      await db
        .collection("IndividualShoppingListItems")
        .doc(data._id)
        .update(documentData);
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
  const userId = context.auth?.uid;
  if (userId) {
    const result = await db.collection("Users").doc(userId).get();
    return result.data() ?? "no data";
  }
});

exports.editUser = functions.https.onCall(async (data, context) => {
  const userId = context.auth.uid;
  if (userId) {
    await db.collection("Users").doc(userId).update(data);
  }
});

exports.getIndividualLists = functions.https.onCall(async (data, context) => {
  const userId = context.auth.uid;
  const filter = data.filter;
  if (userId) {
    let docs = [];
    let results;
    if (filter) {
      results = await db
        .collection("IndividualLists")
        .where("uid", "==", userId)
        .where("_id", "==", filter)
        .get();
      results.forEach((doc) => {
        const fullDoc = doc.data();
        fullDoc._id = doc.id;
        docs.push(fullDoc);
      });
    } else {
      results = await db
        .collection("IndividualLists")
        .where("uid", "==", userId)
        .get();
      results.forEach((doc) => {
        const fullDoc = doc.data();
        fullDoc._id = doc.id;
        docs.push(fullDoc);
      });
    }

    docs = docs.sort((a, b) =>
      a.title < b.title ? -1 : a.title > b.title ? 1 : 0
    );
    return docs;
  }
});

exports.addIndividualList = functions.https.onCall(async (data, context) => {
  const userId = context.auth.uid;
  if (userId) {
    const newList = db.collection("IndividualLists").doc();
    data.uid = userId;
    data._id = newList.id;
    await newList.set(data);
  }
});

exports.deleteIndividualList = functions.https.onCall(async (data, context) => {
  const userId = context.auth.uid;
  if (userId) {
    await db.collection("IndividualLists").doc(data._id).delete();
  }
});

exports.updateIndividualList = functions.https.onCall(async (data, context) => {
  const userId = context.auth.uid;
  if (userId) {
    await db.collection("IndividualLists").doc(data._id).update(data);
  }
});

exports.addCategories = functions.https.onCall(async (data, context) => {
  const userId = context.auth.uid;
  if (userId) {
    data._id = userId;
    await db.collection("Categories").doc(userId).set(data);
  }
});

exports.getCategories = functions.https.onCall(async (data, context) => {
  const userId = context.auth.uid;
  if (userId) {
    const result = await db.collection("Categories").doc(userId).get();
    return result.data() ?? null;
  }
});
