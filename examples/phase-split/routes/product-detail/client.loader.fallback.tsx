import { clientLoaderFallback } from "./.route"

export default clientLoaderFallback(({params}) => {
  return <h1>Fallback {params.id}</h1>
})
