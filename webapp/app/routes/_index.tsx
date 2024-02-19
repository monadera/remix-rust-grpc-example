import { ActionFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";

import { validationError } from "remix-validated-form";

import { allStocks } from "~/api/refdata.server";
import { allPositions, sendOrder } from "~/api/trade.server";
import {
  OrderForm,
  validator as orderValidator,
} from "~/components/order-form";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
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

export async function action({ request }: ActionFunctionArgs) {
  const { data, error } = await orderValidator.validate(
    await request.formData()
  );

  if (error) {
    return validationError(error);
  }

  const { error: apiError } = await sendOrder({ ...data });
  return json({ ok: true, error: apiError }, { status: error ? 400 : 200 });
}

export default function Index() {
  const { positions, stocks } = useLoaderData<typeof loader>();
  const data = useActionData<typeof action>();

  return (
    <div className="grid gap-6">
      <OrderForm stocks={stocks} />
      {data && "error" in data && (
        <Alert variant="destructive">
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{data.error}</AlertDescription>
        </Alert>
      )}
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
