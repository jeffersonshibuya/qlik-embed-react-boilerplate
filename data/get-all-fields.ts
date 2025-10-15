/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getAllFields(qDoc: any) {

  const fieldListObj = await qDoc.createSessionObject({
    qInfo: { qType: "FieldList" },
    qFieldListDef: {
      qShowSystem: false,
      qShowHidden: false,
    },
  });

  const layout = await fieldListObj.getLayout();
  return layout.qFieldList.qItems.map((item: any) => item.qName);

}
