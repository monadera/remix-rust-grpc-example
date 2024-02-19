import { MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { allPositions } from "~/api/trade.server";
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
  const positions = await allPositions();
  return json({ ...positions });
};

export default function Index() {
  const { positions } = useLoaderData<typeof loader>();

  return (
    <div className="grid gap-6">
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
