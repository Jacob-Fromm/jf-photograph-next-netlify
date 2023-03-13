import { client } from "../studio/util/client.js";
import imageUrlBuilder from "@sanity/image-url";

export default function ImageBuilder(query) {
  const builder = imageUrlBuilder(client);

  function urlFor(source) {
    return builder.image(source);
  }

  async function getStaticProps() {
    const data = await client.fetch(query);

    return {
      props: {
        data,
      },
    };
  }
}
