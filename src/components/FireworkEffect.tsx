import { useEffect, useRef } from "react";
import { Fireworks, type FireworksHandlers } from "@fireworks-js/react";

export function Firework() {
  const ref = useRef<FireworksHandlers>(null);

  useEffect(() => {
    ref.current?.updateOptions({
      opacity: 1,
      rocketsPoint: {
        min: 0,
        max: 0,
      },
      hue: {
        min: 0,
        max: 0,
      },
    });
  }, []);

  return (
    <Fireworks
      ref={ref}
      style={{
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        position: "fixed",
        background: "transparent",
      }}
    />
  );
}
