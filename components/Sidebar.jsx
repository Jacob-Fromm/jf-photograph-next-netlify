export default function SideBar({ galleries }) {
  console.log("props in sidebar", galleries);
  //   const titles = galleries.map((gallery) => {
  //     return gallery.title;
  //   });
  return (
    <div className="sidebar">
      {galleries.map((gallery) => {
        return <h3 key={gallery.slug.current}>{gallery.title}</h3>;
      })}
    </div>
  );
}
