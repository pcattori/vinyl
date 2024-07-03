import type { ClientAction } from "./_lib"

import type { Params } from "./params"

import type server from "../server"
type ServerAction = (typeof server)["action"]

export function clientAction<T extends ClientAction<Params, ServerAction>>(arg: T): T {
  return arg
}
