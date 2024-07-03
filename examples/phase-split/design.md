## phase split

Split out server-only stuff (`loader` + `action`) into its own module: `server.ts`.

Then split out client loader, action, and hydrate fallback into their own modules so that they can be code-split and loaded separately.
For example, when doing a client-side navigation, we want to be able to download and render the hydrate fallback asap without needing to wait for the client loader to download (and then to run).

- `route.ts`
- `server.ts`
- `client.loader.ts`
- `client.loader.fallback.ts`
- `client.action.ts`

## `.route`

We'll typegen/codegen stuff into a local `.route` (naming TBD) for each route.
You can and should gitignore `.route`.

Stuff in `.route` knows what URL path the route has so can typegen params and stuff like that.
Other modules in `.route` wire up type inference across the different parts of a route.
