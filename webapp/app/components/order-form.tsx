import { withZod } from "@remix-validated-form/with-zod";

import { ValidatedForm } from "remix-validated-form";
import { z } from "zod";
import { zfd } from "zod-form-data";

import { Stock } from "~/api/generated/refdata";
import { Side } from "~/api/generated/trade";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface Props {
  stocks: Stock[];
}

export const validator = withZod(
  z.object({
    stockId: zfd.numeric(),
    quantity: zfd.numeric(z.number().int()),
    side: z.preprocess((v) => parseInt(v as string), z.nativeEnum(Side)),
  })
);

export function OrderForm({ stocks }: Props) {
  return (
    <ValidatedForm id="stock-form" method="post" validator={validator}>
      <div className="grid gap-2 md:grid-cols-2">
        <Select name="stockId">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a stock" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Stocks</SelectLabel>
              {stocks.map((stock) => (
                <SelectItem key={stock.id} value={stock.id.toString()}>
                  {stock.symbol} ({stock.name})
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input type="number" name="quantity" placeholder="Quantity" />

        <Button type="submit" name="side" value={1}>
          Buy
        </Button>
        <Button variant="destructive" type="submit" name="side" value={0}>
          Sell
        </Button>
      </div>
    </ValidatedForm>
  );
}
