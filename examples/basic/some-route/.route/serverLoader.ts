// typegen
import type { ServerLoader } from "./_helpers"
import type { Params } from "./params"

export function serverLoader<T extends ServerLoader<Params>>(t: T): T {
  return t
}
