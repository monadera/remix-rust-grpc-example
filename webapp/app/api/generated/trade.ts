/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal.js";
import { Empty } from "./google/protobuf/empty.js";
import { Stock } from "./refdata.js";

export const protobufPackage = "trade";

export enum Side {
  SELL = 0,
  BUY = 1,
  UNRECOGNIZED = -1,
}

export function sideFromJSON(object: any): Side {
  switch (object) {
    case 0:
    case "SELL":
      return Side.SELL;
    case 1:
    case "BUY":
      return Side.BUY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Side.UNRECOGNIZED;
  }
}

export function sideToJSON(object: Side): string {
  switch (object) {
    case Side.SELL:
      return "SELL";
    case Side.BUY:
      return "BUY";
    case Side.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface MarketOrder {
  stockId: number;
  quantity: number;
  side: Side;
}

export interface Position {
  stock: Stock | undefined;
  quantity: number;
}

export interface Positions {
  positions: Position[];
}

function createBaseMarketOrder(): MarketOrder {
  return { stockId: 0, quantity: 0, side: 0 };
}

export const MarketOrder = {
  encode(message: MarketOrder, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.stockId !== 0) {
      writer.uint32(8).int32(message.stockId);
    }
    if (message.quantity !== 0) {
      writer.uint32(16).uint32(message.quantity);
    }
    if (message.side !== 0) {
      writer.uint32(24).int32(message.side);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MarketOrder {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarketOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.stockId = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.quantity = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.side = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MarketOrder {
    return {
      stockId: isSet(object.stockId) ? globalThis.Number(object.stockId) : 0,
      quantity: isSet(object.quantity) ? globalThis.Number(object.quantity) : 0,
      side: isSet(object.side) ? sideFromJSON(object.side) : 0,
    };
  },

  toJSON(message: MarketOrder): unknown {
    const obj: any = {};
    if (message.stockId !== 0) {
      obj.stockId = Math.round(message.stockId);
    }
    if (message.quantity !== 0) {
      obj.quantity = Math.round(message.quantity);
    }
    if (message.side !== 0) {
      obj.side = sideToJSON(message.side);
    }
    return obj;
  },

  create(base?: DeepPartial<MarketOrder>): MarketOrder {
    return MarketOrder.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MarketOrder>): MarketOrder {
    const message = createBaseMarketOrder();
    message.stockId = object.stockId ?? 0;
    message.quantity = object.quantity ?? 0;
    message.side = object.side ?? 0;
    return message;
  },
};

function createBasePosition(): Position {
  return { stock: undefined, quantity: 0 };
}

export const Position = {
  encode(message: Position, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.stock !== undefined) {
      Stock.encode(message.stock, writer.uint32(10).fork()).ldelim();
    }
    if (message.quantity !== 0) {
      writer.uint32(16).uint32(message.quantity);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Position {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePosition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.stock = Stock.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.quantity = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Position {
    return {
      stock: isSet(object.stock) ? Stock.fromJSON(object.stock) : undefined,
      quantity: isSet(object.quantity) ? globalThis.Number(object.quantity) : 0,
    };
  },

  toJSON(message: Position): unknown {
    const obj: any = {};
    if (message.stock !== undefined) {
      obj.stock = Stock.toJSON(message.stock);
    }
    if (message.quantity !== 0) {
      obj.quantity = Math.round(message.quantity);
    }
    return obj;
  },

  create(base?: DeepPartial<Position>): Position {
    return Position.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Position>): Position {
    const message = createBasePosition();
    message.stock = (object.stock !== undefined && object.stock !== null) ? Stock.fromPartial(object.stock) : undefined;
    message.quantity = object.quantity ?? 0;
    return message;
  },
};

function createBasePositions(): Positions {
  return { positions: [] };
}

export const Positions = {
  encode(message: Positions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.positions) {
      Position.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Positions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePositions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.positions.push(Position.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Positions {
    return {
      positions: globalThis.Array.isArray(object?.positions)
        ? object.positions.map((e: any) => Position.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Positions): unknown {
    const obj: any = {};
    if (message.positions?.length) {
      obj.positions = message.positions.map((e) => Position.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<Positions>): Positions {
    return Positions.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Positions>): Positions {
    const message = createBasePositions();
    message.positions = object.positions?.map((e) => Position.fromPartial(e)) || [];
    return message;
  },
};

export type TradeDefinition = typeof TradeDefinition;
export const TradeDefinition = {
  name: "Trade",
  fullName: "trade.Trade",
  methods: {
    sendOrder: {
      name: "SendOrder",
      requestType: MarketOrder,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    allPositions: {
      name: "AllPositions",
      requestType: Empty,
      requestStream: false,
      responseType: Positions,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface TradeServiceImplementation<CallContextExt = {}> {
  sendOrder(request: MarketOrder, context: CallContext & CallContextExt): Promise<DeepPartial<Empty>>;
  allPositions(request: Empty, context: CallContext & CallContextExt): Promise<DeepPartial<Positions>>;
}

export interface TradeClient<CallOptionsExt = {}> {
  sendOrder(request: DeepPartial<MarketOrder>, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  allPositions(request: DeepPartial<Empty>, options?: CallOptions & CallOptionsExt): Promise<Positions>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
