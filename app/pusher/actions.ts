'use server'

import Pusher from "pusher";
import { env } from "#/src/env.mjs";

const pusher = new Pusher({
    appId: env.PUSHER_APP_ID,
    key: env.NEXT_PUBLIC_PUSHER_APP_KEY,
    secret: env.PUSHER_APP_SECRET,
    cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
    useTLS: true
});

export async function pushMessage(data: FormData) {
    pusher.trigger("public-channel", "broadcast", {
        message: data.get("message")
    });
}
