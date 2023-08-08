"use server";

import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";
import pusher from "#/src/server/pusher";
import {
  getInitialSession,
  getSessionStateChannel,
  sessionStateEventName,
} from "#/src/lib/planningPokerSession";
import { userCookieName } from "#/src/lib/cookies";

const schema = zfd.formData({
  name: zfd.text(),
});

export async function createPlanningSession(data: FormData) {
  const { name } = schema.parse(data);
  const userId = uuidv4();
  const sessionId = uuidv4();
  cookies().set(userCookieName, userId);
  pusher.trigger(getSessionStateChannel(sessionId), sessionStateEventName, {
    message: getInitialSession(userId, name),
  });
  redirect(`/planning-session/${sessionId}`);
}
