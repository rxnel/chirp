import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { appRouter } from "~/server/api/root";
import { db } from "~/server/db";

export const generateSSGHelper = () => {
  return createServerSideHelpers({
    router: appRouter,
    ctx: { db, userId: null },
    transformer: superjson, // optional - adds superjson serialization
  });
};
