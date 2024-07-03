import type { ClientLoaderFallback } from "./_lib"
import type { Params } from "./params"

export function clientLoaderFallback<T extends ClientLoaderFallback<Params>>(arg: T): T {
  return arg
}