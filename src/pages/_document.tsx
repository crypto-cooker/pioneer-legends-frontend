/* eslint-disable @next/next/next-script-for-ga */
import { Html, Head, Main, NextScript } from "next/document";
import { GTM_ID } from "../config";

const MyDocument: React.FC = () => {
  return (
    <Html lang="en">
      <Head>
        {/* Include Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Russo+One&family=Saira:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ${GTM_ID});
              `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
