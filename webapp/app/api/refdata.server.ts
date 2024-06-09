import { createChannel, createClient } from "nice-grpc";

import type { RefDataClient } from "~/api/generated/refdata";
import { RefDataDefinition } from "~/api/generated/refdata";

let _client: RefDataClient;

function getClient(): RefDataClient {
  if (!_client) {
    const address = process.env.API_URL;
    if (!address) {
      throw new Error("API URL is not set");
    }
    const channel = createChannel(address);

    _client = createClient(RefDataDefinition, channel);
  }
  return _client;
}

export async function allStocks() {
  return await getClient().allStocks({});
}
