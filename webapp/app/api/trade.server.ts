import { ClientError, createChannel, createClient } from "nice-grpc";

import type { MarketOrder, TradeClient } from "~/api/generated/trade";
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

export async function sendOrder(order: MarketOrder) {
  try {
    await getClient().sendOrder(order);
    return { ok: true, error: undefined };
  } catch (err) {
    if (err instanceof ClientError && err.code === 3) {
      return { ok: false, error: "Insufficient position." };
    }
    throw err;
  }
}
