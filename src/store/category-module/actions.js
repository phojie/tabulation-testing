import { fireDB } from "boot/firebase";
import lowercase from "lodash/lowerCase";
import capitalize from "lodash/capitalize";

export function addCategoryAction(context, payload) {
  return new Promise(function(resolve, reject) {
    const catRef = fireDB.collection("Owner/CKCM/Categories").doc();
    const catRefId = catRef.id;

    catRef.set({
      keyIndex: catRefId,
      name: lowercase(payload.name),
      eventKeyindex: payload.eventId,
      score: 100
    });
    resolve(capitalize(payload.name)).catch(function(error) {
      resolve(error);
    });
  });
}

export function getCategoryAction(context, payload) {
  return new Promise(function(resolve, reject) {
    const catRef = fireDB
      .collection("Owner/CKCM/Categories")
      .where("eventKeyindex", "==", payload);
    catRef.onSnapshot(
      function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
          if (change.type == "added" || change.type == "modified") {
            context.commit("categoryActionMutation", change.doc.data());
          }
          if (change.type == "removed") {
            context.commit("DELETE_categoryActionMutation", change.doc.data());
          }
        });
        resolve();
      },
      function(error) {
        resolve(error);
      }
    );
  });
}
