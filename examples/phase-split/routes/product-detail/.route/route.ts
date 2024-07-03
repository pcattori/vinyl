import type { Route } from "./_lib"

import type {Params} from './params'

import type server from '../server'
import type clientLoader from '../client.loader'
import type clientLoaderFallback from '../client.loader.fallback'
import type clientAction from '../client.action'

export function route<T extends Route<Params, typeof server, typeof clientLoader, typeof clientLoaderFallback, typeof clientAction>>(arg: T): T {
  return arg
}