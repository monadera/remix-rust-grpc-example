import { createChannel, createClient } from "nice-grpc";

import type { TradeClient } from "~/api/generated/trade";
import { TradeDefinition } from "~/api/generated/trade";

let _client: TradeClient;

function getClient(): TradeClient {
  if (!_client) {
    const address = process.env.API_URL;
    if (!address) {
      throw new Error("API URL is not set");
    }
    const channel = createChannel(address);

    _client = createClient(TradeDefinition, channel);
  }
  return _client;
}

export async function allPositions() {
  return await getClient().allPositions({});
}
