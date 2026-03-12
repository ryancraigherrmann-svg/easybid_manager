import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

// Determine the GraphQL URL based on environment
const getGraphqlUrl = (): string => {
  if (typeof window !== 'undefined') {
    if (import.meta.env.VITE_GRAPHQL_URL) {
      return import.meta.env.VITE_GRAPHQL_URL;
    }
    return `${window.location.origin}/graphql`;
  }
  return 'http://localhost:4000/graphql';
};

const graphqlUrl = getGraphqlUrl();
console.log('Apollo Client connecting to GraphQL URL:', graphqlUrl);

const httpLink = new HttpLink({ 
  uri: graphqlUrl,
  credentials: 'include',
});

// Auth link: attach JWT token from localStorage to every GraphQL request
const authLink = new ApolloLink((operation, forward) => {
  try {
    const raw = localStorage.getItem('easybid_auth_v1');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.token && parsed?.expiry && Date.now() < parsed.expiry) {
        operation.setContext(({ headers = {} }: any) => ({
          headers: {
            ...headers,
            authorization: `Bearer ${parsed.token}`,
          },
        }));
      }
    }
  } catch {
    // ignore
  }
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;
