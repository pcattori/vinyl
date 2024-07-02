import { serverLoader } from "./.route/serverLoader"

export default serverLoader(() => {
  return { planet: "world" }
})
