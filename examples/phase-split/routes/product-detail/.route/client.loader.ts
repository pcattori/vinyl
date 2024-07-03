import type { ClientLoader, ClientLoaderOptions }from "./_lib"

import type { Params } from "./params"

import type server from "../server"
type ServerLoader = (typeof server)["loader"]

export function clientLoader<T extends ClientLoader<Params, ServerLoader>, U extends ClientLoaderOptions>(
  arg: T,
  options?: U,
): [T, U | undefined] {
  return [arg, options]
}
