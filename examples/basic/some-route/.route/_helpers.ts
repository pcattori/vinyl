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

type ResponseStub = {
  status: number | undefined
  headers: Headers
}

// loader
type LoaderArgs<Params> = {
  context: AppLoadContext
  request: Request
  params: Pretty<Params>
  response: ResponseStub
}

export type ServerLoader<Params> = (args: LoaderArgs<Params>) => Data

export type ClientLoader<Params, serverLoader extends ServerLoader<any>> = (
  args: LoaderArgs<Params> & {
    serverLoader: () => Promise<Awaited<ReturnType<serverLoader>>>
  },
) => Data

type GetData<T extends ServerLoader<any> | ClientLoader<any, any>> = Awaited<
  ReturnType<T>
>
type LoaderData<ServerLoaderData, ClientLoaderData> =
  Equal<ClientLoaderData, undefined> extends false
    ? ClientLoaderData
    : ServerLoaderData

export type Component<
  Params,
  serverLoader extends ServerLoader<Params>,
  clientLoader extends ClientLoader<Params, serverLoader>,
> = (args: {
  params: Pretty<Params>
  loaderData: LoaderData<GetData<serverLoader>, GetData<clientLoader>>
}) => ReactNode
