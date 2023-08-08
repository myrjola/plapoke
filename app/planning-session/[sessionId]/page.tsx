"use client";

import { ReactNode, useEffect, useState } from "react";
import Pusher, { Members, PresenceChannel } from "pusher-js";
import {
  getSessionPresenceChannel,
  getSessionStateChannel,
  sessionStateEventName,
} from "#/src/lib/planningPokerSession";
import pusherClient from "#/src/client/pusherClient";

export default function Page({ params }: { params: { sessionId: string } }) {
  const { sessionId } = params;
  const [sessionMembers, setSessionMembers] = useState<Members | null>(null);

  useEffect(() => {
    Pusher.logToConsole = process.env.NODE_ENV !== "production";
    const stateChannel = pusherClient.subscribe(
      getSessionStateChannel(sessionId)
    );
    stateChannel.bind(sessionStateEventName, function (data) {
      // alert(JSON.stringify(data));
    });
    return () => {
      pusherClient.unbind(sessionStateEventName);
    };
  }, []);
  useEffect(() => {
    const presenceChannel = pusherClient.subscribe(
      getSessionPresenceChannel(sessionId)
    ) as PresenceChannel;
    presenceChannel.bind(
      "pusher:subscription_succeeded",
      (members: Members) => {
        console.log(JSON.stringify(members, null, 2));
        setSessionMembers(members);
      }
    );
    presenceChannel.bind("pusher:member_added", () => {
      setSessionMembers(presenceChannel.members);
    });
    return () => {
      pusherClient.unbind("pusher:subscription_succeeded");
      pusherClient.unbind("pusher:member_added");
    };
  }, []);

  if (sessionMembers === null) {
    return <div>Connecting...</div>;
  }

  let members: ReactNode = [];

  sessionMembers.each((member: any) =>
    members.push(<pre key={member.id}>{JSON.stringify(member, null, 2)}</pre>)
  );

  return (
    <div>
      <h1>Members</h1>
      <p>count: {sessionMembers.count}</p>
      {members}
    </div>
  );
}
