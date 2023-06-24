import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    PUSHER_APP_ID: z.string().min(1),
    NEXT_PUBLIC_PUSHER_APP_KEY: z.string().min(1),
    PUSHER_APP_SECRET: z.string().min(1),
    NEXT_PUBLIC_PUSHER_CLUSTER: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_PUSHER_APP_KEY: z.string().min(1),
    NEXT_PUBLIC_PUSHER_CLUSTER: z.string().min(1)
  },
  runtimeEnv: {
    PUSHER_APP_ID: process.env.PUSHER_APP_ID,
    PUSHER_APP_SECRET: process.env.PUSHER_APP_SECRET,
    NEXT_PUBLIC_PUSHER_APP_KEY: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    NEXT_PUBLIC_PUSHER_CLUSTER: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  },
});
