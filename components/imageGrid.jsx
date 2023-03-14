import { client } from "../studio/util/client.js";
import imageUrlBuilder from "@sanity/image-url";
import { useState } from "react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const UnsplashImage = ({ image, _key }) => (
  <div className="scroll-image-item" key={_key}>
    <img src={urlFor(image).url()} />
  </div>
);

export default function ImageGrid(data) {
  console.log("gallery in grid component: ", data.data);
  // Return JSX
  return (
    <div className="scroll-hero is-fullheight is-bold is-info">
      <div className="scroll-hero-body">
        <div className="scroll-container">
          <div className="scroll-header content">
            <h2 className="scroll-subtitle is-6">Code Challenge #16</h2>
            <h1 className="scroll-title is-1">
              Infinite Scroll Unsplash Code Challenge
            </h1>
          </div>
          <InfiniteScroll
            dataLength={data}
            next={""}
            hasMore={true}
            loader={
              <img
                src="https://res.cloudinary.com/chuloo/image/upload/v1550093026/scotch-logo-gif_jq4tgr.gif"
                alt="loading"
              />
            }
          >
            <div className="scroll-image-grid" style={{ marginTop: "30px" }}>
              {data.data.map((image, index) => {
                return <UnsplashImage image={image} key={index} />;
              })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

export async function getStaticProps() {
  const gridImages = await client.fetch(
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
      gridImages,
    },
  };
}
