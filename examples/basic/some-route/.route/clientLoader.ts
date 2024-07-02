// typegen
import type { ClientLoader } from "./_helpers"
import type { Params } from "./params"

// import type { ServerLoader } from "./_helpers"
import type serverLoader from "../serverLoader"
type ServerLoader = typeof serverLoader

export function clientLoader<T extends ClientLoader<Params, ServerLoader>>(
  t: T,
): T {
  return t
}
