import type { Server } from "./_lib"

import type { Params } from "./params"

export function server<T extends Server<Params>>(arg: T): T {
  return arg
}
