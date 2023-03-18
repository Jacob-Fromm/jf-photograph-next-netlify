import { client } from "../studio/util/client.js";

export default function Gallery({ gallery }) {
  console.log(gallery[0]);
  return <div>{<h1>{gallery[0].title}</h1>}</div>;
}

export async function getStaticPaths() {
  const galleries = await client.fetch(`*[_type=='project']`);
  const paths = galleries.map((collection) => {
    const gallerySlug = collection.slug.current;
    return {
      params: {
        gallerySlug,
      },
    };
  });
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const gallerySlug = params.gallerySlug;
  const gallery = await client.fetch(
    `*[_type=='project' && slug.current == '${gallerySlug}']`
  );
  return {
    props: {
      gallery,
    },
  };
}
