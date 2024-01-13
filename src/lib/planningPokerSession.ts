import z from "zod";
import { v4 as uuidv4 } from "uuid";

const planningPokerSessionStateSchema = z.object(
  {
    admin: z.string({ description: "admin userId" }),
    revealCards: z.boolean({
      description: "signals if admin has revealed the cards",
    }),
    userState: z.array(
      z.object(
        {
          id: z.string({ description: "user's id" }),
          name: z.string({ description: "user's name" }),
          card: z
            .number({
              description:
                "the value of the selected card. null when no card is selected in the current round.",
            })
            .nullable(),
        },
        { description: "user state" }
      ),
      {
        description: "list of current user state in the session",
      }
    ),
  },
  { description: "schema of planning poker session state" }
);

type PlanningPokerSessionState = z.infer<
  typeof planningPokerSessionStateSchema
>;

export function getSessionStateChannel(sessionId: string) {
  return `cache-plapoke-board-state-${sessionId}`;
}

export function getSessionPresenceChannel(sessionId: string) {
  return `presence-plapoke-session-${sessionId}`;
}

export const sessionStateEventName = "sessionState";

export function getInitialSession(
  adminUserId: string,
  adminName: string
): PlanningPokerSessionState {
  return {
    admin: adminUserId,
    revealCards: false,
    userState: [
      {
        id: adminUserId,
        name: adminName,
        card: null,
      },
    ],
  };
}
