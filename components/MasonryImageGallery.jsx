import React, { useState, useEffect, useCallback } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { client } from "../studio/util/client.js";
import imageUrlBuilder from "@sanity/image-url";

export default function MasonryImageGallery({ gallery }) {
  const [data, setData] = useState(0);
  const [modal, setModal] = useState(false);

  const viewImage = (index) => {
    setData(index);
    setModal(true);
  };
  const keyDownHandler = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      return imgAction("escape");
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      return imgAction("prev-img");
    } else if (event.key === "ArrowRight") {
      console.log("listening to right arrow");
      event.preventDefault();
      return imgAction("next-img");
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const imgAction = (action) => {
    if (action === "next-img") {
      setData((i) => (i + 1 > gallery.length - 1 ? 0 : i + 1));
    } else if (action === "prev-img") {
      setData((i) => (i - 1 < 0 ? gallery.length - 1 : i - 1));
    } else if (action === "escape") {
      setData(0);
      setModal(false);
    }
  };

  console.log("data outside functions: ", data);
  return (
    <>
      {modal && (
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
            <img src={urlFor(gallery[data]).url()} alt="" />
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
                onClick={() => viewImage(i)}
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
