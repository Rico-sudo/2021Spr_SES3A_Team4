import axios from "axios";
import { onlyResolvesLast } from "awesome-only-resolves-last-promise";
import { REACT_APP_SERVERLESS_API_ENDPOINT } from "@env";

const fetchSnakeDetails = (classId) => {
  let uri = `${REACT_APP_SERVERLESS_API_ENDPOINT}getSnakeDetails?classId=${classId}`;
  console.log(uri);
  return axios.get(uri, { timeout: 10000 });
};

export const getSnakeDetails = onlyResolvesLast(fetchSnakeDetails);
