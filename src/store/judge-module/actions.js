import { fireDB } from "boot/firebase";
import lowercase from "lodash/lowercase";
import capitalize from "lodash/capitalize";

export function addJudgeAction(context, payload) {
  return new Promise(function(resolve, reject) {
    const judgeRef = fireDB.collection("Owner/CKCM/Judges/").doc();
    const judgeRefId = judgeRef.id;

    judgeRef.set({
      keyIndex: judgeRefId,
      fullname: lowercase(payload.fullname),
      eventKeyindex: payload.eventId,
      passCode: payload.passcode
    });
    resolve(capitalize(payload.fullname)).catch(function(error) {
      resolve(error);
    });
  });
}

export function getJudgeAction(context, payload) {
  return new Promise(function(resolve, reject) {
    const judgeRef = fireDB
      .collection("Owner/CKCM/Judges")
      .where("eventKeyindex", "==", payload);
    judgeRef.onSnapshot(
      function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
          if (change.type == "added") {
            context.commit("judgeActionMutation", change.doc.data());
          }
          if (change.type == "removed") {
            context.commit("DELETE_judgeActionMutation", change.doc.data());
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
