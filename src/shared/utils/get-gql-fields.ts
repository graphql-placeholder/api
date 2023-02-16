const getGqlFields = (info: any) => {
  const fields = info.fieldNodes[0].selectionSet.selections.map((item) => {
    return item.name.value;
  });
  return fields;
};

export default getGqlFields;
