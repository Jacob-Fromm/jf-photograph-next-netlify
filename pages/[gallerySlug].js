import AsNavFor from "@components/AsNavFor.jsx";
import ImageGallery from "@components/ImageGallery.jsx";
import { client } from "../studio/util/client.js";
import Carousel from "@components/Carousel.js";
import imageUrlBuilder from "@sanity/image-url";
import MasonryImageGallery from "@components/MasonryImageGallery.jsx";

export default function Gallery({ gallery }) {
  console.log(gallery[0]);
  return (
    <div
      style={{
        padding: `0.5rem`,
        // maxWidth: 1200,
        // marginLeft: "auto",
        // marginRight: "auto",
        // marginTop: 64,
      }}
    >
      <h1>{gallery[0].title}</h1>
      <MasonryImageGallery gallery={gallery[0].photos.images} />
      {/* <ImageGallery gallery={gallery[0].photos.images} /> */}
      {/* <AsNavFor gallery={gallery[0].photos.images} /> */}
      {/* <Carousel images={gallery[0].photos.images} /> */}
      {/* <div className="photo-container">
        {gallery[0].photos.images.length > 0 &&
          gallery[0].photos.images.map((image) => {
            return (
              <div className="photo-div">
                <img className="gallery-photo" src={urlFor(image).url()} />
              </div>
            );
          })} */}
      {/* </div> */}
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

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}
