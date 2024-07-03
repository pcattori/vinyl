import { server } from "./.route"

export default server({
  loader() {
    return { server: "loader" }
  },
  action() {
    return { server: "action" }
  },
})
