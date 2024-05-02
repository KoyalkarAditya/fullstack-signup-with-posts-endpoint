import { useInView } from "react-intersection-observer";

function LazyLoadedImage({ src, alt }: { src: string; alt: string }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div ref={ref}>
      {inView && (
        <img src={src} alt={alt} style={{ width: "50px", height: "50px" }} />
      )}
    </div>
  );
}

export default LazyLoadedImage;
