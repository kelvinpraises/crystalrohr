import generateQuickGuid from "@/utils/generateQuickGuid";
import { Auth } from "@polybase/auth";
import { Polybase } from "@polybase/client";
import { useCallback, useMemo, useState } from "react";

const db = new Polybase({
  defaultNamespace:
    "pk/0xc0ccc35ddd223f3f873dcb7fb1cec7d511e361ac611fb407fbcd2b854bf99143193fc42715a91c18c65849f5eb99dfe0faa3b77870ae954e8bb7ae36c4585988/crystalrohr",
});

const auth = typeof window !== "undefined" ? new Auth() : null;

const userReference = db.collection("User");
const historyReference = db.collection("History");
const noteReference = db.collection("Note");
const forumPostReference = db.collection("ForumPost");

export const usePolybase = () => {
  const [loggedIn, setLogin] = useState(false);
  const [user, setUser] = useState<any>();
  const [getNotesRecord, setNotesRecord] = useState<any>();

  useMemo(() => {
    auth?.onAuthUpdate((authState) => {
      if (authState) {
        setLogin(true);
        setUser(authState.userId);
      } else {
        setLogin(false);
      }
    });
  }, [auth]);

  const signIn = async () => {
    if (!auth) return;
    const res = await auth.signIn({ force: true });
    db.signer(async (data) => {
      console.log(data);
      return {
        h: "eth-personal-sign",
        sig: await auth.ethPersonalSign(data),
      };
    });

    if (!res?.userId) return auth.signOut();

    await userReference.create([
      res?.userId,
      "", // name
      res?.email || "",
      "user",
      Date.now(),
    ]);

    setUser(res?.userId);
  };

  const signOut = async () => {
    if (!auth) return;
    await auth.signOut();
  };

  const createUserRecord = useCallback(
    async ({
      id,
      name,
      email,
    }: {
      id: string;
      name: string;
      email: string;
    }) => {
      await userReference.create([id, name, email, "user", Date.now()]);
    },
    []
  );

  const createHistoryRecord = useCallback(
    async ({
      title,
      channel,
      imageUrl,
    }: {
      title: string;
      channel: string;
      imageUrl: string;
    }) => {
      const randomId = generateQuickGuid() + "-" + Date.now();
      historyReference
        .create([randomId, title, channel, imageUrl, Date.now()])
        .then(() => {
          userReference
            .record(user)
            .call("setHistoryId", [randomId, Date.now()]);
        });
    },
    []
  );

  const createNotesRecord = useCallback(
    async ({ title, body }: { title: string; body: string }) => {
      const randomId = generateQuickGuid() + "-" + Date.now();
      noteReference.create([randomId, title, body, Date.now()]).then(() => {
        userReference.record(user).call("setNoteId", [randomId, Date.now()]);
      });
    },
    []
  );

  const createForumRecord = useCallback(
    async ({
      title,
      body,
      mediaUrl,
    }: {
      title: string;
      body: string;
      mediaUrl: string;
    }) => {
      const randomId = generateQuickGuid() + "-" + Date.now();
      await historyReference
        .create([randomId, title, body, mediaUrl, Date.now()])
        .then(() => {
          userReference
            .record(user)
            .call("setForumPost", [randomId, Date.now()]);
        });
    },
    []
  );

  const getUserRecord = useCallback(async () => {
    return userReference.record(user).get();
  }, []);

  const getHistoryRecord = useCallback(async () => {
    const { historyId } = (await userReference.record(user).get()) as any;
    const data = (historyId as any[]).map(
      async (id) => await historyReference.record(id).get()
    );
    return await Promise.all(data);
  }, []);

  useMemo(async () => {
    userReference.record(user).onSnapshot(
      (newDoc) => {
        const { notesId } = newDoc as any;
        setNotesRecord(notesId);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const getForumsRecord = useCallback(async () => {
    const { forumPostsId } = (await userReference.record(user).get()) as any;
    const data = (forumPostsId as any[]).map(
      async (id) => await historyReference.record(id).get()
    );
    return await Promise.all(data);
  }, []);

  return {
    signIn,
    signOut,
    loggedIn,

    createUserRecord,
    createHistoryRecord,
    createNotesRecord,
    createForumRecord,

    getUserRecord,
    getHistoryRecord,
    getNotesRecord,
    getForumsRecord,
  };
};
