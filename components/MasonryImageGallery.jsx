import React, { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { client } from "../studio/util/client.js";
import imageUrlBuilder from "@sanity/image-url";

export default function MasonryImageGallery({ gallery }) {
  const [data, setData] = useState({ img: null, i: 0 });

  const viewImage = (img, i) => {
    console.log("viewImage props: ", img, i);
    setData({ img, i });
    console.log("data after setting in viewImage :", data);
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      console.log("User pressed: ", event.key);

      if (event.key === "Escape") {
        event.preventDefault();

        imgAction("escape");
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const imgAction = (action) => {
    let i = data.i;
    if (action === "next-img") {
      setData({ img: gallery[i + 1], i: i + 1 });
    } else if (action === "prev-img") {
      setData({ img: gallery[i - 1], i: i - 1 });
    } else if (action === "escape") {
      setData({ img: null, i: 0 });
    }
  };

  return (
    <>
      {data.img && (
        <>
          <button
            onClick={() => imgAction("escape")}
            className="lightbox-buttons"
            style={{
              position: "absolute",
              top: "1em",
              right: "1em",
              cursor: "pointer",
            }}
          >
            x
          </button>
          <div id="lightbox">
            <button
              onClick={() => imgAction("prev-img")}
              id="prev-button"
              className="lightbox-buttons arrow-buttons"
            >
              &#60;
            </button>
            <img src={urlFor(data.img).url()} alt="" />
            <button
              onClick={() => imgAction("next-img")}
              id="next-button"
              className="lightbox-buttons arrow-buttons"
            >
              &#62;
            </button>
          </div>
        </>
      )}
      <div className="masonry-container">
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="0.5rem">
            {gallery.map((image, i) => (
              <img
                key={i}
                src={urlFor(image).url()}
                style={{ width: "100%", display: "block", cursor: "pointer" }}
                alt=""
                onClick={() => viewImage(image, i)}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
}

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}
