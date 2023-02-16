const getFields = (selectionSet: any) => {
  const fields = selectionSet.selections.map((item) => {
    return item.name.value;
  });
  return fields;
};

const getGqlFields = (info: any, entryPoint?: string) => {
  if (!entryPoint) {
    return getFields(info.fieldNodes[0].selectionSet);
  }

  const findSelectedGqlInfo = info.fieldNodes[0].selectionSet.selections.find(
    (item: any) => item.name.value === entryPoint,
  );

  return getFields(findSelectedGqlInfo.selectionSet);
};

export default getGqlFields;
