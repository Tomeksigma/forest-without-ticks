import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/nauczyciele")({
  beforeLoad: () => {
    throw redirect({ to: "/dla-nauczycieli", statusCode: 301 });
  },
});
