import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("dashboard", "routes/dashboard.tsx"),
  // index("routes/home.tsx"),
  route("/", "routes/home.tsx"),
  route("exploration-chart", "exploration-chart/index.tsx"),
] satisfies RouteConfig;
