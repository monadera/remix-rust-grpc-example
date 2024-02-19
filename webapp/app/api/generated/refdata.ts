/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal.js";
import { Empty } from "./google/protobuf/empty.js";

export const protobufPackage = "refdata";

export interface Stock {
  id: number;
  symbol: string;
  name: string;
}

export interface Stocks {
  stocks: Stock[];
}

function createBaseStock(): Stock {
  return { id: 0, symbol: "", name: "" };
}

export const Stock = {
  encode(message: Stock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.symbol !== "") {
      writer.uint32(18).string(message.symbol);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Stock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.symbol = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Stock {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      symbol: isSet(object.symbol) ? globalThis.String(object.symbol) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
    };
  },

  toJSON(message: Stock): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.symbol !== "") {
      obj.symbol = message.symbol;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create(base?: DeepPartial<Stock>): Stock {
    return Stock.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Stock>): Stock {
    const message = createBaseStock();
    message.id = object.id ?? 0;
    message.symbol = object.symbol ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseStocks(): Stocks {
  return { stocks: [] };
}

export const Stocks = {
  encode(message: Stocks, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.stocks) {
      Stock.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Stocks {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStocks();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.stocks.push(Stock.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Stocks {
    return { stocks: globalThis.Array.isArray(object?.stocks) ? object.stocks.map((e: any) => Stock.fromJSON(e)) : [] };
  },

  toJSON(message: Stocks): unknown {
    const obj: any = {};
    if (message.stocks?.length) {
      obj.stocks = message.stocks.map((e) => Stock.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<Stocks>): Stocks {
    return Stocks.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Stocks>): Stocks {
    const message = createBaseStocks();
    message.stocks = object.stocks?.map((e) => Stock.fromPartial(e)) || [];
    return message;
  },
};

export type RefDataDefinition = typeof RefDataDefinition;
export const RefDataDefinition = {
  name: "RefData",
  fullName: "refdata.RefData",
  methods: {
    allStocks: {
      name: "AllStocks",
      requestType: Empty,
      requestStream: false,
      responseType: Stocks,
      responseStream: false,
      options: {},
    },
    addStock: {
      name: "AddStock",
      requestType: Stock,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface RefDataServiceImplementation<CallContextExt = {}> {
  allStocks(request: Empty, context: CallContext & CallContextExt): Promise<DeepPartial<Stocks>>;
  addStock(request: Stock, context: CallContext & CallContextExt): Promise<DeepPartial<Empty>>;
}

export interface RefDataClient<CallOptionsExt = {}> {
  allStocks(request: DeepPartial<Empty>, options?: CallOptions & CallOptionsExt): Promise<Stocks>;
  addStock(request: DeepPartial<Stock>, options?: CallOptions & CallOptionsExt): Promise<Empty>;
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
