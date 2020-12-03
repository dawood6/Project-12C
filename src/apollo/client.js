import fetch from "cross-fetch";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const Client = new ApolloClient({
  link: new HttpLink({
    uri: "/.netlify/functions/hello",
    fetch,
  }),
  cache: new InMemoryCache(),
});
export default Client;
