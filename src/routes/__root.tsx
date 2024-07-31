import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className=" flex gap-2 justify-between">
        <div>
          <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-3xl">
            Bốc thăm chia đội
          </h1>
        </div>
        <div className="flex gap-10">
          <Link
            to="/slowSplit"
            className="[&.active]:font-bold [&.active]:border-solid [&.active]:border-slate-200 p-2 [&.active]:rounded-lg [&.active]:border-t [&.active]:border-l [&.active]:border-r"
          >
            Chia từ từ
          </Link>{" "}
          <Link
            to="/fastSplit"
            className="[&.active]:font-bold [&.active]:border-solid [&.active]:border-slate-200 p-2 [&.active]:rounded-lg [&.active]:border-t [&.active]:border-l [&.active]:border-r"
          >
            Chia nhanh
          </Link>
        </div>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
