// @ts-nocheck
import { clientLoader } from "./.route"

export default clientLoader(
  (stuff, blah, blarg) => {
    return { stuff, blah, blarg }
  },
  { hydrate: true },
)
