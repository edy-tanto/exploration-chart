import type { Route } from "./+types/dashboard";

export async function loader({ params }: Route.LoaderArgs) {
  return {
    eventName: "Christmas Party",
  };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1>{loaderData.eventName} Dashboard</h1>
    </>
  );
}
