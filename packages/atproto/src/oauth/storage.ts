import type {
  NodeSavedSession,
  NodeSavedSessionStore,
  NodeSavedState,
  NodeSavedStateStore,
} from "@atproto/oauth-client-node";
import { RedisClient } from "../redisClient/client";

export class StateStore implements NodeSavedStateStore {
  constructor(private db: RedisClient) {}
  async get(key: string): Promise<NodeSavedState | undefined> {
    const result = await this.db.get(key);
    if (!result) return;
    return JSON.parse(result) as NodeSavedState;
  }
  async set(key: string, val: NodeSavedState) {
    const state = JSON.stringify(val);
    await this.db.set(key, state);
  }
  async del(key: string) {
    await this.db.del(key);
  }
}

export class SessionStore implements NodeSavedSessionStore {
  constructor(private db: RedisClient) {}
  async get(key: string): Promise<NodeSavedSession | undefined> {
    const result = await this.db.get(key);
    if (!result) return;
    return JSON.parse(result) as NodeSavedSession;
  }
  async set(key: string, val: NodeSavedSession) {
    const session = JSON.stringify(val);
    await this.db.set(key, session);
  }
  async del(key: string) {
    await this.db.del(key);
  }
}
