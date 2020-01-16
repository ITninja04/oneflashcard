import { User } from "./model";

type AUTH = "INVALID_SESSION_KEY";

type ApiResponse<E, V> = Promise<{ error: E } | { value: V }>;

const sleep = (ms: number = 500) => new Promise(r => setTimeout(r(), ms));

export default {
  async login(
    email: string,
    password: string
  ): ApiResponse<"INVALID_DETAILS", { user: User; sessionKey: string }> {
    await sleep();

    if (email === "chance@carey.sh" && password === "somepass")
      return {
        value: {
          user: { userID: "some-user-id", email: "chance@carey.sh" },
          sessionKey: "some-session-key"
        }
      };

    return { error: "INVALID_DETAILS" };
  },

  async restore(sessionKey: string): ApiResponse<AUTH, { user: User }> {
    await sleep();

    if (sessionKey === "some-session-key")
      return {
        value: { user: { userID: "some-user-id", email: "chance@carey.sh" } }
      };

    return { error: "INVALID_SESSION_KEY" };
  }
};
