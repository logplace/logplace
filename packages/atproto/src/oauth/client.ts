import { NodeOAuthClient } from "@atproto/oauth-client-node";
import { SessionStore, StateStore } from "./storage";
import { getRedisClient } from "../redisClient/client";
import { getMetadata } from "./getMetadata";

export const createClient = async () => {
  return new NodeOAuthClient({
    clientMetadata: getMetadata(),
    stateStore: new StateStore(getRedisClient()),
    sessionStore: new SessionStore(getRedisClient()),
  });
};
