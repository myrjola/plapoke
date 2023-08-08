import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import pusher from "#/src/server/pusher";
import { zfd } from "zod-form-data";
import { userCookieName } from "#/src/lib/cookies";

const schema = zfd.formData({
  socket_id: zfd.text(),
  channel_name: zfd.text(),
});

export async function POST(req: Request) {
  const body = schema.parse(await req.formData());
  const socketId = body.socket_id;
  const channel = body.channel_name;
  const user_id = cookies().get(userCookieName)?.value;

  if (!user_id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const presenceData = { user_id };
  const authResponse = pusher.authorizeChannel(socketId, channel, presenceData);
  return NextResponse.json(authResponse);
}
