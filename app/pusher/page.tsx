'use client'

import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { pushMessage } from './actions'
import {useEffect} from "react";
import Pusher from 'pusher-js'
import { env } from "#/src/env.mjs";

export default function PusherPage() {
    const { pending } = useFormStatus()

    useEffect(() => {
        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;

        const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
            cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER
        });

        const channel = pusher.subscribe('public-channel');
        channel.bind('broadcast', function(data) {
            alert(JSON.stringify(data));
        });

        return () => {
            pusher.unbind('broadcast')
            pusher.disconnect()
        }
    })

    return (
        <form action={pushMessage}>
            <label>
                <span>Message:</span>
                <input name="message" />
            </label>
            <button disabled={pending} type="submit">Broadcast message</button>
        </form>
    )
}
