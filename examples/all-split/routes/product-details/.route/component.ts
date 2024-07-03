// typegen
import type { Component } from "./_helpers"
import type { Params } from "./params"

import type serverLoader from "../serverLoader"
import type clientLoader from "../clientLoader"

type ServerLoader = typeof serverLoader
type ClientLoader = typeof clientLoader

export function component<
  T extends Component<Params, ServerLoader, ClientLoader>,
>(t: T): T {
  return t
}
