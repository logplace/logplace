import { NodeOAuthClient } from "@atproto/oauth-client-node";
import { SessionStore, StateStore } from "./storage";
import { getRedisClient } from "../redisClient/client";
import { getMetadata } from "./getMetadata";

export const createClient = async () => {
  const redisClient = getRedisClient();

  return new NodeOAuthClient({
    clientMetadata: getMetadata(),
    stateStore: new StateStore(redisClient),
    sessionStore: new SessionStore(redisClient),
  });
};
export type AtprotoOAuthClient = InstanceType<typeof NodeOAuthClient>;
