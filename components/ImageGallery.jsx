import React, { Component } from "react";
import Slider from "react-slick";
import { client } from "../studio/util/client.js";
import imageUrlBuilder from "@sanity/image-url";

export default function ImageGallery(images) {
  var settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 1,
    //       infinite: true,
    //       dots: true,
    //     },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1,
    //       initialSlide: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };
  console.log("images in slider: ", images.gallery);
  return (
    <div>
      <h2> Responsive </h2>
      <div className="container">
        <Slider {...settings}>
          {images.gallery.map((image) => {
            return (
              <div key={image._key}>
                <img
                  key={image._key}
                  src={urlFor(image).fit("fillmax").url()}
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}
