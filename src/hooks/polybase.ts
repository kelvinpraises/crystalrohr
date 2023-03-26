import generateQuickGuid from "@/utils/generateQuickGuid";
import { Auth } from '@polybase/auth';
import { Polybase } from "@polybase/client";
import { useCallback, useMemo, useState } from "react";

const db = new Polybase({
  defaultNamespace: "pk/0xc0ccc35ddd223f3f873dcb7fb1cec7d511e361ac611fb407fbcd2b854bf99143193fc42715a91c18c65849f5eb99dfe0faa3b77870ae954e8bb7ae36c4585988/crystalrohr",
});

const auth = typeof window !== "undefined" ? new Auth() : null;

const userReference = db.collection("User");
const historyReference = db.collection("History");


export const usePolybase = () => {
  const [loggedIn, setLogin] = useState(false)
  let id;
  let username;
  let email;
  let accountType;


  useMemo(() => {
    auth?.onAuthUpdate((authState) => {
      if (authState) {
        setLogin(true)
      } else {
        setLogin(false)
      }
    })
  }, [auth])

  const signIn = async () => {
    if (!auth) return
    const res = await auth.signIn({ force: true });
    db.signer(async (data) => {
      console.log(data);
      return {
        h: "eth-personal-sign",
        sig: await auth.ethPersonalSign(data)
      };
    });
    console.log("signIn", res);
  }

  const signOut = async () => {
    if (!auth) return
    await auth.signOut()
  }

  const createUserRecord = useCallback(async () => {
    const randomId = generateQuickGuid() + "-" + Date.now()
    const recordData = await userReference.create([
      randomId,
      "kelvin praises",
      "kelvinpraises@gmail.com",
      "user",
      Date.now()
    ]);

    console.log(recordData)
  }, [])

  const createHistoryRecord = useCallback(async () => {
    const randomId = generateQuickGuid()

    const recordData = await historyReference.create([
      randomId,
      "video",
      Date.now()
    ]);
  }, [])

  return { signIn, signOut, loggedIn, createUserRecord, createHistoryRecord }
}