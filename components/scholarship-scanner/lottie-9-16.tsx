"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

/** Renders the 9_16.json Lottie animation. */
export function Lottie916() {
  const [data, setData] = useState<object | null>(null);

  useEffect(() => {
    fetch("/animations/9_16.json")
      .then((res) => res.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) return null;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Lottie
        animationData={data}
        loop
        className="h-full w-full object-contain"
      />
    </div>
  );
}
