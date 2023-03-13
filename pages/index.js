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
                console.log("data: ", image.asset.url);
              }
              return (
                <img src={urlFor(image).width(200).auto("format").url()} />
              );
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

// client.fetch(query, params).then((images) => {
//   console.log("Bikes with more than one seat:");
//   images.forEach((image) => {
//     console.log(`${image.url} `);
//   });
// });
