/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getAllFields(qDoc: any) {
  if (!qDoc) return [];

  const fieldListObj = await qDoc.createSessionObject({
    qInfo: { qType: "FieldList" },
    qFieldListDef: {
      qShowSystem: false,
      qShowHidden: false,
    },
  });

  const layout = await fieldListObj.getLayout();
  const fields = layout.qFieldList.qItems.map((item: any) => item.qName);

  // ✅ Clean up the session object to prevent listener leaks
  await fieldListObj.close?.();

  return fields;
}
