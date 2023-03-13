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
        <Header title="Welcome to my app!" />
        <h1>hello world</h1>
        {featuredGallery.length > 0 && (
          <ul>
            {featuredGallery[0].map((image) => {
              {
                console.log(image);
              }
              <li key={image._key}>
                <img src={urlFor(image).width(200).url()} />
              </li>;
            })}
          </ul>
        )}
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
    `*[_type == "project" && title == "Europe 2021"].photos.images`
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
