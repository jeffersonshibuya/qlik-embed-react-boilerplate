import { openAppSession, type Doc } from "@qlik/api/qix";
export const openSession = () => {
  const session = openAppSession({
    appId: "5a004e8c-8e42-473a-a4be-9688b5618f52",
  });
  console.log(session);
  return session;
  // const doc: Doc = await session.getDoc();
  // return doc;
};
