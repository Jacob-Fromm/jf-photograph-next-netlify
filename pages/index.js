import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { client } from "../studio/util/client.js";
import imageUrlBuilder from "@sanity/image-url";
import React from "react";
import { useState } from "react";
import SideBar from "@components/Sidebar.jsx";
import Link from "next/link";

export default function Home({ featuredGalleries }) {
  const [featuredImages, setFeaturedImages] = useState([featuredGalleries]);
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

  // organizeImages(featuredGalleries[0].photos.images);
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
          <SideBar galleries={featuredGalleries} />
          <div className="photo-container">
            {featuredGalleries.length > 0 &&
              featuredGalleries.map((project) => {
                return (
                  <Link
                    className="photo-div"
                    key={project.mainImage.asset._id}
                    href={`/${encodeURIComponent(project.slug.current)}`}
                  >
                    <img
                      className="gallery-photo"
                      src={urlFor(project.mainImage).url()}
                    />
                    <div className="middle">
                      <h3 className="photo-text">{project.title}</h3>
                    </div>
                  </Link>
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
  const featuredGalleries = await client.fetch(
    `*[_type=='project']{title,slug,mainImage{asset->}}`
  );

  return {
    props: {
      featuredGalleries,
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
