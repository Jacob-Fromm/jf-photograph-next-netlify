import React, { useState, useEffect } from "react";
import { client } from "../studio/util/client.js";
import imageUrlBuilder from "@sanity/image-url";

const Carousel = (props) => {
  const children = props.images;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);

  useEffect(() => {
    setLength(children.length);
  }, [children]);

  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  console.log(props.images);
  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {currentIndex > 0 && (
          <button onClick={prev} className="left-arrow">
            &lt;
          </button>
        )}
        <div className="carousel-content-wrapper">
          <div
            className="carousel-content"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {props.images.map((image) => {
              return (
                <img key={image._key} src={urlFor(image).fit("clip").url()} />
              );
            })}
          </div>
        </div>
        {currentIndex < length - 1 && (
          <button onClick={next} className="right-arrow">
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

export default Carousel;
