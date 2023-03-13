import {createClient} from 'next-sanity'

export const client = createClient({
  projectId: '62u5nf85',
  dataset: 'production',
  apiVersion: '2022-03-25',
  useCdn: false,
})

// const data = await client.fetch(`count(*)`)

// console.log(`Number of documents: ${data}`)
