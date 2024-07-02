import { clientLoader } from "./.route"

export default clientLoader(async ({ serverLoader }) => {
  let stuff = await serverLoader()
  return { planet: "earth", stuff }
})
