"use client";

import Script from "next/script";

export default function TawkToChat() {
    return (
        <Script
            id="tawk-to-widget"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),
            s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/68a5a3e4cce2331929fa19e3/1j33ggdn6';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `,
            }}
        />
    );
}
