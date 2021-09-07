import axios from "axios";
import { onlyResolvesLast } from "awesome-only-resolves-last-promise";
import { REACT_APP_SERVERLESS_API_ENDPOINT } from "@env";

const autocompleteSearchAustralianSnakes = (query) => {
  let uri = `${REACT_APP_SERVERLESS_API_ENDPOINT}autocompleteSearchAustralianSnakes?query=${query}`;
  return axios.get(uri, { timeout: 10000 });
};

export const autocompleteSearch = onlyResolvesLast(
  autocompleteSearchAustralianSnakes
);
