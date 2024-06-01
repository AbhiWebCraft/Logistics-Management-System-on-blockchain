import "@/styles/globals.css";


import { Footer, NavBar } from '../Components';
import { TrackingProvider } from '../Context/Tracking';

export default function App({ Component, pageProps }) {
  return (
    <>
    <TrackingProvider>
      <NavBar />
      <Component {...pageProps} />
    </TrackingProvider>
    <Footer />
    </>
  );
}
