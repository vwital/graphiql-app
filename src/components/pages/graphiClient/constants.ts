const QUERY_FOR_GRAPHQL = `
  {
    __schema {
      types {
        name
        fields {
          name
        }
      }
    }
  }
`;
export { QUERY_FOR_GRAPHQL };
