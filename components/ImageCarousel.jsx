import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { client } from "studio/util/client";
import imageUrlBuilder from "@sanity/image-url";

export default class ImageCarousel extends Component {
  play() {
    this.slider.slickPlay();
  }
  pause() {
    this.slider.slickPause();
  }
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      draggable: true,
      swipeToSlide: true,
      autoplaySpeed: 10000,
    };

    console.log("testimonial page props", this.props.images);
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {this.props.images.map((image) => (
            <img src={urlFor(image).width(200).fit("scale").url()} />
          ))}
        </Slider>
      </div>
    );
  }
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
