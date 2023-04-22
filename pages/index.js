import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { client } from "../studio/util/client.js";
import imageUrlBuilder from "@sanity/image-url";
import React from "react";
import { useState } from "react";
import SideBar from "@components/Sidebar.jsx";
import Link from "next/link";
import MasonryImageGallery from "@components/MasonryImageGallery.jsx";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

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
  let mainImages = [];
  return (
    <div className="">
      <Head>
        <title>Jake Fromm Photography</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Jake Fromm Photography" />
      <SideBar galleries={featuredGalleries} />
      <main>
        {/* <div className="with-sidebar"> */}
        {/* <div className="photo-container"> */}
        {
          featuredGalleries.length > 0 && (
            // mainImages.push(project.mainImage);
            // console.log("mainImages after push :", mainImages);
            <div className="masonry-container">
              <ResponsiveMasonry columnsCountBreakPoints={{ 300: 1 }}>
                <Masonry gutter="0.5rem">
                  {featuredGalleries.map((project, i) => {
                    console.log(project);
                    return (
                      <Link
                        className="photo-div"
                        key={project.mainImage.asset._id}
                        href={`/${encodeURIComponent(project.slug.current)}`}
                      >
                        <img
                          className="gallery-photo"
                          key={i}
                          src={project.mainImage.asset.url}
                          style={{
                            width: "100%",
                            display: "block",
                            cursor: "pointer",
                          }}
                          alt=""
                        />
                        <div className="middle">
                          <h3 className="photo-text">{project.title}</h3>{" "}
                        </div>
                      </Link>
                    );
                  })}
                </Masonry>
              </ResponsiveMasonry>
            </div>
          )
          // <Link
          //   className="photo-div"
          //   key={project.mainImage.asset._id}
          //   href={`/${encodeURIComponent(project.slug.current)}`}
          // >
          //   <img
          //     className="gallery-photo"
          //     src={urlFor(project.mainImage).url()}
          //   />
          //   <div className="middle">
          //     <h3 className="photo-text">{project.title}</h3>
          //   </div>
          // </Link>
        }
        {/* </div> */}
        {/* </div> */}
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
