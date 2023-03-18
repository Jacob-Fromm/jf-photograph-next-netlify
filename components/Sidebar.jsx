import Link from "next/link";

export default function SideBar({ galleries }) {
  console.log("props in sidebar", galleries);
  //   const titles = galleries.map((gallery) => {
  //     return gallery.title;
  //   });
  return (
    <div className="sidebar">
      {galleries.map((gallery) => {
        return (
          <h3 key={gallery.slug.current}>
            <Link href={`/${encodeURIComponent(gallery.slug.current)}`}>
              {gallery.title}
            </Link>
          </h3>
        );
      })}
    </div>
  );
}
