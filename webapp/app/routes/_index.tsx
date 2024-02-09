import { MetaFunction } from "@remix-run/node";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export const meta: MetaFunction = () => {
  return [
    { title: "Positions | Trading App" },
    { name: "description", content: "A simple trading app." },
  ];
};

export default function Index() {
  return (
    <Alert>
      <AlertTitle>Welcome!</AlertTitle>
      <AlertDescription>
        This is the future home of a trading app.
      </AlertDescription>
    </Alert>
  );
}
