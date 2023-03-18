import { client } from "../studio/util/client.js";

export default function Gallery({ gallery }) {
  console.log(gallery);
  return (
    <div>
      <h1>{gallery.slug.current}</h1>
    </div>
  );
}

export async function getStaticPaths() {
  const galleries = await client.fetch(`*[_type=='project']`);
  return {
    paths: galleries.map((collection) => {
      const gallery = collection.slug.current;
      return {
        params: {
          gallery,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const gallery = params.gallery;
  const galleries = await client.fetch(`*[_type=='project']`);
  return {
    props: {
      gallery: galleries[0],
    },
  };
}
