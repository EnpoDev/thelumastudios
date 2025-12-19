import "../public/styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
