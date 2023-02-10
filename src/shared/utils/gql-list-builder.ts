export const graphQLListBuilder = (list: any[]) => {
  const nodes = list;
  const totalCount = nodes.length;
  const hasNextPage = false;
  const edges = nodes.map((node) => {
    return {
      cursor: node._id,
      node,
    };
  });
  return {
    edges,
    nodes,
    totalCount,
    hasNextPage,
  };
};
