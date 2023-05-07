import React, { useState, useEffect, useCallback } from "react";

export default function ArrowTester() {
  const data = [1, 2, 3, 4, 5];
  const [selection, setSelection] = useState(0);

  const changeImage = useCallback((e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setSelection((a) => a + 1);
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", changeImage);
  }, []);

  console.log("selection out of function: ", selection);
  return (
    <>
      <h1>arrow testing page</h1>
      <p>{data[selection]}</p>
    </>
  );
}
