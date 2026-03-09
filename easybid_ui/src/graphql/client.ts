import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Determine the GraphQL URL based on environment
const getGraphqlUrl = (): string => {
  // In browser environment, use relative path or environment variable
  if (typeof window !== 'undefined') {
    // If explicit VITE_GRAPHQL_URL is set, use it
    if (import.meta.env.VITE_GRAPHQL_URL) {
      return import.meta.env.VITE_GRAPHQL_URL;
    }
    
    // Otherwise, use the current origin with /graphql path
    // This works for both local and production deployments
    return `${window.location.origin}/graphql`;
  }
  
  // Server-side fallback (shouldn't happen in browser)
  return 'http://localhost:4000/graphql';
};

const graphqlUrl = getGraphqlUrl();
console.log('Apollo Client connecting to GraphQL URL:', graphqlUrl);

export const apolloClient = new ApolloClient({
  link: new HttpLink({ 
    uri: graphqlUrl,
    credentials: 'include', // Include cookies for authenticated requests
  }),
  cache: new InMemoryCache(),
});

export default apolloClient;
