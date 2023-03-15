import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { client } from "../studio/util/client.js";
import imageUrlBuilder from "@sanity/image-url";
import React from "react";
import { useState } from "react";
import SideBar from "@components/Sidebar.jsx";

export default function Home({ featuredGallery }) {
  const [featuredImages, setFeaturedImages] = useState([featuredGallery]);
  const [horizontals, setHorizontals] = useState([]);
  const [verticals, setVerticals] = useState([]);

  // const organizeImages = (photos) => {
  //   photos.map((image) => {
  //     let width = image.asset.metadata.dimensions.width;
  //     let height = image.asset.metadata.dimensions.height;
  //     if (width > height) {
  //       horizontals.push(image);
  //     } else if (height > width) {
  //       verticals.push(image);
  //     }
  //   });
  // };

  // organizeImages(featuredGallery[0].photos.images);
  console.log(featuredImages[0]);
  return (
    <div className="container">
      <Head>
        <title>Jake Fromm Photography</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title="Jake Fromm Photography" />
        <div className="with-sidebar">
          <SideBar />
          <div className="photo-container">
            {featuredGallery.length > 0 &&
              featuredGallery.map((project) => {
                return (
                  <div className="photo-div" key={project.mainImage.id}>
                    <img
                      className="gallery-photo"
                      src={urlFor(project.mainImage)
                        .height(600)
                        .fit("clip")
                        .url()}
                    />
                    <div className="middle">
                      <h3 className="photo-text">{project.title}</h3>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
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
    // `*[_type == "project" && title == "Europe 2021"]{
    //   photos{
    //     images[]{
    //       ...,
    //       asset->
    //     }
    //   }
    // }`
    `*[_type=='project']{title,mainImage{asset->}}`
  );

  return {
    props: {
      featuredGallery,
    },
  };
}

// export function ImageGridItem({ image }) {
//   let width = image.asset.metadata.dimensions.width;
//   let height = image.asset.metadata.dimensions.height;
//   if (width > height) {
//     return (
//       <img
//         className="horizontal"
//         src={urlFor(image).width(200).fit("scale").url()}
//         alt={image.alt}
//       />
//     );
//   } else if (height > width) {
//     return (
//       <img
//         className="vertical"
//         src={urlFor(image).width(200).fit("scale").url()}
//         alt={image.alt}
//       />
//     );
//   } else {
//     return (
//       <img className="grid-item" src={urlFor(image).url()} alt={image.alt} />
//     );
//   }
// }
