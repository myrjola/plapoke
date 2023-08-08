"use client";

import Pusher from "pusher-js";
import { env } from "#/src/env.mjs";

export default new Pusher(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
  cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
});
