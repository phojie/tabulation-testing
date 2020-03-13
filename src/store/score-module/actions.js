import { fireDB } from "boot/firebase";
import lowercase from "lodash/lowerCase";
import capitalize from "lodash/capitalize";

export function addScoreAction(context, payload) {
  let dataCateg = payload.dataCateg;
  let data = payload.data;
  let tab = payload.tab;
  let userAccount = payload.userAccount.keyIndex;
  let gender;
  if (data.gender === "Male") {
    //male data
    gender = "Male";
  } else {
    //female data
    gender = "Female";
  }
  return new Promise(function(resolve, reject) {
    const scoreRef = fireDB
      .collection("Owner/CKCM/Scores/")
      .doc(data.keyIndex + dataCateg.keyIndex + tab + gender + userAccount);
    scoreRef.set({
      ...payload,
      ...{
        yawangaIndex:
          data.keyIndex + dataCateg.keyIndex + tab + gender + userAccount
      }
    });
    resolve(capitalize(payload.fullname)).catch(function(error) {
      resolve(error);
    });
  });
}

export function getScoreAction(context, payload) {
  return new Promise(function(resolve, reject) {
    const scoreRef = fireDB.collection("Owner/CKCM/Scores");
    scoreRef.onSnapshot(
      function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
          if (change.type == "added" || change.type == "modified") {
            context.commit("scoreActionMutation", change.doc.data());
          }
          if (change.type == "removed") {
            // context.commit("DELETE_scoreActionMutation", change.doc.data());
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
