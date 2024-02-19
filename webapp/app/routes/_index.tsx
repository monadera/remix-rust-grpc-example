import { MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { allStocks } from "~/api/refdata.server";
import { allPositions } from "~/api/trade.server";
import { OrderForm } from "~/components/order-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export const meta: MetaFunction = () => {
  return [
    { title: "Positions | Trading App" },
    { name: "description", content: "A simple trading app." },
  ];
};

export const loader = async () => {
  const [positions, stocks] = await Promise.all([allPositions(), allStocks()]);
  return json({ ...positions, ...stocks });
};

export default function Index() {
  const { positions, stocks } = useLoaderData<typeof loader>();

  return (
    <div className="grid gap-6">
      <OrderForm stocks={stocks} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Stock</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {positions.map((position) => (
            <TableRow key={position?.stock?.symbol}>
              <TableCell>{position?.stock?.symbol}</TableCell>
              <TableCell>{position?.stock?.name}</TableCell>
              <TableCell>{position.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
