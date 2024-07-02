import { component } from "./.route"

export default component(({ params, loaderData }) => {
  console.log(params.id)
  return `Hello, ${loaderData.planet}!`
})
