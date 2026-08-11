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

        {/* Montserrat from Google Fonts — Latin + Cyrillic subsets for Bulgarian support.
            display=swap renders text in a fallback font immediately. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&subset=latin,cyrillic&display=swap"
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

// Aliases map RN font family names to the correct Montserrat weight.
// Each alias includes both cyrillic-ext and latin subset WOFF2 files (real URLs from
// Google Fonts) with proper unicode-range so Bulgarian characters render in bold/semibold/etc.
// All weights share the same cyrillic-ext and cyrillic WOFF2 — only the latin differs.
const CYR_EXT = 'https://fonts.gstatic.com/s/montserrat/v31/JTUSjIg1_i6t8kCHKm459WRhyzbi.woff2';
const CYR     = 'https://fonts.gstatic.com/s/montserrat/v31/JTUSjIg1_i6t8kCHKm459W1hyzbi.woff2';
const LATIN   = 'https://fonts.gstatic.com/s/montserrat/v31/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2';

function alias(family: string, weight: number) {
  return `
  @font-face {
    font-family: '${family}';
    src: url('${CYR_EXT}') format('woff2');
    font-weight: ${weight};
    font-display: swap;
    unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  @font-face {
    font-family: '${family}';
    src: url('${CYR}') format('woff2');
    font-weight: ${weight};
    font-display: swap;
    unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  @font-face {
    font-family: '${family}';
    src: url('${LATIN}') format('woff2');
    font-weight: ${weight};
    font-display: swap;
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
                   U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122,
                   U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }`;
}

const fontAliases = [
  alias('Montserrat-Light',     300),
  alias('Montserrat-Medium',    500),
  alias('Montserrat-SemiBold',  600),
  alias('Montserrat-Bold',      700),
  alias('Montserrat-ExtraBold', 800),
  alias('Montserrat-Black',     900),
].join('\n');

const responsiveBackground = `
body {
  background-color: #fff;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000;
  }
}`;
