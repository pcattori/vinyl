import { clientLoader } from "./.route/clientLoader"

export default clientLoader(async ({ serverLoader }) => {
  let stuff = await serverLoader()
  return { planet: "earth", stuff }
})
