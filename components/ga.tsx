import Script from 'next/script'

export default () => (
  <>
    <Script
      src='https://www.googletagmanager.com/gtag/js?id=G-0YCEGH6ERT'
      strategy='afterInteractive'
    />
    <Script id='google-analytics' strategy='afterInteractive'>
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-0YCEGH6ERT');
      `}
    </Script>
  </>
)
