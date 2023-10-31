import React, { useEffect } from "react";
import { 
  collection, 
  onSnapshot, 
  query, 
  where 
} from "firebase/firestore";
import { db } from "../firebase";

// this function is reusable for any collection
// and also factored out any direct firestore calls from the component
const doUseEffect = (stateSetter, coll, user) => {
  useEffect(
      () => {
          if (!user) {
                stateSetter([]);
              return;
          }
          // if our code continues execution to here, a user is logged in
          // do a query on firestore collection
          const q = query(
              collection(db, coll),
              where("user", "==", user.uid)
          );
          // since query() is async, here we set up an event handler with firebase
          onSnapshot(
              q,
              (querySnapshot) => {
                  // in this function we have all the results from q in querySnapshot
                  let ar = [];
                  // loop thru each doc in the results
                  querySnapshot.docs.forEach(
                      (doc) => {
                          ar.push(
                              {
                                  id: doc.id,
                                  ...doc.data()
                              }
                          );
                      }
                  );
                  // once we loop thru using forEach and have array of docs in ar
                  stateSetter(ar);
              }
          );
      },
      [user]
  );
  
}

export { doUseEffect };