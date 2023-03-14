const UnsplashImage = ({ image, key }) => (
  <div className="image-item" key={key}>
    <img src={urlFor(image).width(200).fit("scale").url()} />
  </div>
);
