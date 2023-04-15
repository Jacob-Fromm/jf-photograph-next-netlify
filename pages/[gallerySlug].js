import AsNavFor from "@components/AsNavFor.jsx";
import ImageGallery from "@components/ImageGallery.jsx";
import { client } from "../studio/util/client.js";
import Carousel from "@components/Carousel.js";

export default function Gallery({ gallery }) {
  console.log(gallery[0]);
  return (
    <div
      style={{
        maxWidth: 1200,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 64,
      }}
    >
      <h1>{gallery[0].title}</h1>
      <ImageGallery gallery={gallery[0].photos.images} />
      {/* <AsNavFor gallery={gallery[0].photos.images} /> */}
      {/* <Carousel images={gallery[0].photos.images} /> */}
    </div>
  );
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
