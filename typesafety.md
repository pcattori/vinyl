```ts
// option 1.a: `define` named exports
import { define } from "./.types/route"
export const meta = define.meta(() => {})
export const links = define.links(() => {})
export const Component = define.Component(() => {})
export const ErrorBoundary = define.ErrorBoundary(() => {})
export const shouldRevalidate = define.shouldRevalidate(() => {})
export const handle = define.handle(() => {})

// option 1.b: named exports
import {
  Meta,
  Links,
  Component,
  ErrorBoundary,
  ShouldRevalidate,
  Handle,
} from "./.types/route"
export const meta = Meta(() => {})
export const links = Links(() => {})
export const component = Component(() => {})
export const errorBoundary = ErrorBoundary(() => {})
export const shouldRevalidate = ShouldRevalidate(() => {})
export const handle = Handle(() => {})

// option 2: `satisfies`
import { Meta, Links } from "./.types/route"
export const meta = (() => {}) satisfies Meta
export const links = (() => {}) satisfies Links

// option 3: `define` default export
import { route } from "./.route"

export default route({
  meta: undefined,
  links: undefined,
  Component() {},
  ErrorBoundary() {},
  shouldRevalidate: undefined,
  handle: undefined,
})
```
