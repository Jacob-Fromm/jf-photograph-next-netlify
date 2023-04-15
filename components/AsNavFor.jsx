import React, { Component } from "react";
import Slider from "react-slick";
import { client } from "../studio/util/client.js";
import imageUrlBuilder from "@sanity/image-url";

export default class AsNavFor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  render() {
    return (
      <div>
        <h2>Slider Syncing (AsNavFor)</h2>
        <h4>First Slider</h4>
        <Slider
          asNavFor={this.state.nav2}
          ref={(slider) => (this.slider1 = slider)}
        >
          <div>
            {this.props.gallery.map((image) => {
              return (
                <img
                  key={image._key}
                  src={urlFor(image).width(600).fit("max").url()}
                />
              );
            })}
          </div>
        </Slider>
        <h4>Second Slider</h4>
        <Slider
          asNavFor={this.state.nav1}
          ref={(slider) => (this.slider2 = slider)}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          <div>
            {this.props.gallery.map((image) => {
              return (
                <img
                  key={image._key}
                  src={urlFor(image).width(600).fit("max").url()}
                />
              );
            })}
          </div>
        </Slider>
      </div>
    );
  }
}

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}
