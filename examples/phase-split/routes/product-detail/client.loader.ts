import { clientLoader } from "./.route"

export default clientLoader(
  async ({ serverLoader }) => {
    let stuff = await serverLoader()
    let x = stuff.server
    return { ...stuff, client: "loader" }
  },
  { hydrate: true },
)
