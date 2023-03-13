import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { client } from "../studio/util/client.js";
import imageUrlBuilder from "@sanity/image-url";
import React from "react";

export default function Home({ featuredGallery }) {
  return (
    <div className="container">
      <Head>
        <title>Jake Fromm Photography</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Photo Page" />
        {featuredGallery.length > 0 && (
          <div className="photo-container">
            {console.log(featuredGallery[0].photos.images)}
            {featuredGallery[0].photos.images.map((image) => {
              {
                console.log("data: ", image.asset.metadata.dimensions.width);
              }
              return <ImageGridItem image={image} />;
            })}
          </div>
        )}
        {!featuredGallery.length}
      </main>

      <Footer />
    </div>
  );
}

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

export async function getStaticProps() {
  const featuredGallery = await client.fetch(
    `*[_type == "project" && title == "Europe 2021"]{
      photos{
        images[]{
          ...,
          asset->
        }
      }
    }`
  );

  return {
    props: {
      featuredGallery,
    },
  };
}

export function ImageGridItem({ image }) {
  const width = image.asset.metadata.dimensions.width;
  const height = image.asset.metadata.dimensions.height;
  if (width > height) {
    return (
      <img
        className="horizontal"
        src={urlFor(image).width(200).fit("max").url()}
        alt={image.alt}
      />
    );
  } else if (height > width) {
    return (
      <img
        className="vertical"
        src={urlFor(image).width(200).fit("max").url()}
        alt={image.alt}
      />
    );
  } else {
    return (
      <img className="grid-item" src={urlFor(image).url()} alt={image.alt} />
    );
  }
  // const style = {
  //   gridColumnEnd: `span ${getSpanEstimate(
  //     image.asset.metadata.dimensions.width
  //   )}`,
  //   gridRowEnd: `span ${getSpanEstimate(
  //     image.asset.metadata.dimensions.height
  //   )}`,
  // };
}

export function getSpanEstimate(size) {
  if (size > 5000) {
    console.log("big ", size);
    return 2;
  }
  console.log("small ", size);
  return 1;
}
