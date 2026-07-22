import { ScrollViewStyleReset } from "expo-router/html";

// This file is web-only and used to configure the root HTML for every
// web page during static rendering.
// The contents of this function only run in Node.js environments and
// do not have access to the DOM or browser APIs.
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* 
          This viewport disables scaling which makes the mobile website act more like a native app.
          However this does reduce built-in accessibility. If you want to enable scaling, use this instead:
            <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        */}
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1.00001,viewport-fit=cover"
        />
        {/* 
          Disable body scrolling on web. This makes ScrollView components work closer to how they do on native. 
          However, body scrolling is often nice to have for mobile web. If you want to enable it, remove this line.
        */}
        <ScrollViewStyleReset />

        {/* Preconnect to Google Fonts to eliminate DNS + TCP handshake latency */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Montserrat from Google Fonts — replaces 2.3MB of local TTF files.
            display=swap renders text in a fallback font immediately, swapping
            to Montserrat once loaded so the UI is never blocked. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap"
        />

        {/* Material Symbols */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0&icon_names=stadia_controller" />

        {/* Map RN font family names to Google Fonts Montserrat weights.
            React Native Web sets font-family directly from the fontFamily prop,
            so we alias each named variant to the correct weight. */}
        <style dangerouslySetInnerHTML={{ __html: fontAliases }} />

        {/* Using raw CSS styles as an escape-hatch to ensure the background color never flickers in dark-mode. */}
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

// Montserrat v31 is a variable font — one WOFF2 file covers all weights.
// The browser caches it from the Google Fonts <link> above, so these aliases
// are served from cache (zero extra downloads).
// Each alias maps the RN fontFamily name to the correct font-weight so the
// variable font renders the right thickness.
const MONTSERRAT_WOFF2 = 'https://fonts.gstatic.com/s/montserrat/v31/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2';

const fontAliases = `
  @font-face {
    font-family: 'Montserrat';
    src: url('${MONTSERRAT_WOFF2}') format('woff2');
    font-weight: 400;
    font-display: swap;
  }
  @font-face {
    font-family: 'Montserrat-Light';
    src: url('${MONTSERRAT_WOFF2}') format('woff2');
    font-weight: 300;
    font-display: swap;
  }
  @font-face {
    font-family: 'Montserrat-Medium';
    src: url('${MONTSERRAT_WOFF2}') format('woff2');
    font-weight: 500;
    font-display: swap;
  }
  @font-face {
    font-family: 'Montserrat-SemiBold';
    src: url('${MONTSERRAT_WOFF2}') format('woff2');
    font-weight: 600;
    font-display: swap;
  }
  @font-face {
    font-family: 'Montserrat-Bold';
    src: url('${MONTSERRAT_WOFF2}') format('woff2');
    font-weight: 700;
    font-display: swap;
  }
  @font-face {
    font-family: 'Montserrat-ExtraBold';
    src: url('${MONTSERRAT_WOFF2}') format('woff2');
    font-weight: 800;
    font-display: swap;
  }
  @font-face {
    font-family: 'Montserrat-Black';
    src: url('${MONTSERRAT_WOFF2}') format('woff2');
    font-weight: 900;
    font-display: swap;
  }
`;

const responsiveBackground = `
body {
  background-color: #fff;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000;
  }
}`;
