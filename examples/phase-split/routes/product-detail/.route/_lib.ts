import type { ReactNode } from "react"

// prettier-ignore
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type MaybePromise<T> = T | Promise<T>
type Pretty<T> = { [K in keyof T]: T[K] } & {}

interface AppLoadContext {}

type Serializable =
  | undefined
  | null
  | boolean
  | string
  | symbol
  | number
  | Array<Serializable>
  | { [key: PropertyKey]: Serializable }
  | bigint
  | Date
  | URL
  | RegExp
  | Error
  | Map<Serializable, Serializable>
  | Set<Serializable>
  | Promise<Serializable>

type Data = MaybePromise<
  Exclude<Serializable, undefined | Promise<Serializable>>
>

type IsDefined<T> = Equal<T, undefined> extends true ? false : true;

type ResponseStub = {
  status: number | undefined
  headers: Headers
}

type LoaderArgs<Params> = {
  context: AppLoadContext
  request: Request
  params: Pretty<Params>
  response: ResponseStub
}

// prettier-ignore
type _LoaderData<
  ServerLoaderData,
  ClientLoaderData,
  ClientLoaderHydrate extends boolean,
  ClientLoaderFallback,
> = Awaited<
  [undefined extends ClientLoaderFallback ? false : true, ClientLoaderHydrate]  extends [true, true] ?
    IsDefined<ClientLoaderData> extends true ? ClientLoaderData :
    undefined
  :
  [IsDefined<ClientLoaderData>, IsDefined<ServerLoaderData>] extends [true, true] ? ServerLoaderData | ClientLoaderData :
  IsDefined<ClientLoaderData> extends true ?
    ClientLoaderHydrate extends true ? ClientLoaderData :
    ClientLoaderData | undefined
  :
  IsDefined<ServerLoaderData> extends true ? ServerLoaderData :
  undefined
>

type LoaderData<
  server extends Server<any>,
  clientLoader extends [ClientLoader<any, server['loader']>, ClientLoaderOptions | undefined],
  clientLoaderFallback extends ClientLoaderFallback<any>
> = _LoaderData<
  Awaited<ReturnType<server['loader']>>,
  Awaited<ReturnType<clientLoader[0]>>,
  (
    Equal<clientLoader[1], undefined> extends true ? {hydrate: false} :
    Exclude<clientLoader[1], undefined>
  )['hydrate'],
  clientLoaderFallback
>;

// server
type ServerLoader<Params> = (args: LoaderArgs<Params>) => Data 
type ServerAction<Params> = (args: ActionArgs<Params>) => Data
export type Server<Params> = {
  loader: ServerLoader<Params>
  action: ServerAction<Params>
}

// client.loader
export type ClientLoader<Params, serverLoader extends ServerLoader<Params>> = (
  args: LoaderArgs<Params> & {
    serverLoader: () => Promise<Awaited<ReturnType<serverLoader>>>
  },
) => Data
export type ClientLoaderOptions = { hydrate: boolean }

// client.loader.fallback
export type ClientLoaderFallback<Params> = (args: {
  params: Params
}) => ReactNode

// client.action
type ActionArgs<Params> = {
  context: AppLoadContext
  request: Request
  params: Params
  response: ResponseStub
}
export type ClientAction<Params, serverAction extends ServerAction<Params>> = (
  args: ActionArgs<Params> & {
    serverAction: () => Promise<Awaited<ReturnType<serverAction>>>
  },
) => Data

// prettier-ignore
type ActionData<server extends Server<any>, clientAction extends ClientAction<any, server['action']>> =
  _ActionData<
    Awaited<ReturnType<server['action']>>,
    Awaited<ReturnType<clientAction>>
  >
type _ActionData<ServerActionData, ClientActionData> = Awaited<
  [IsDefined<ServerActionData>, IsDefined<ClientActionData>] extends [true, true] ? ServerActionData | ClientActionData :
  IsDefined<ClientActionData> extends true ? ClientActionData :
  IsDefined<ServerActionData> extends true ? ServerActionData :
  undefined
>

// TODO: get these from 'react-router'
type LinkDescriptor = unknown
type Location = unknown
type MetaMatch = unknown
type MetaDescriptor = unknown
type Handle = unknown

export type Route<
  Params,
  server extends Server<Params>,
  clientLoader extends [ClientLoader<Params, server['loader']>, ClientLoaderOptions | undefined],
  clientLoaderFallback extends ClientLoaderFallback<Params>,
  clientAction extends ClientAction<Params, server['action']>
> = {
  links?: (args: { params: Params }) => LinkDescriptor[]
  meta?: (args: {
    params: Params
    location: Location
    error: unknown
    loaderData: LoaderData<server, clientLoader, clientLoaderFallback>
    matches?: Array<MetaMatch>
  }) => MetaDescriptor[]
  Component?: (args: {
    params: Params
    loaderData: LoaderData<server, clientLoader, clientLoaderFallback>
    TODO: actionData?: ActionData<server, clientAction>
  }) => ReactNode
  shouldRevalidate?: boolean
  handle?: Handle
}

