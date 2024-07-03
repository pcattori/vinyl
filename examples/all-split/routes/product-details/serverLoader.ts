import { serverLoader } from "./.route"

export default serverLoader(() => {
  return { planet: "world" }
})
