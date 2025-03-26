//app/Layout.js レイアウト
import { Noto_Sans_JP } from "next/font/google";
import "@/app/globals.css";
import "@/styles/fonts.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] });

export const metadata = {
  title: "Lockhoda Martin",
  description: "A blog site by students majoring in mechanical and aerospace engineering",
  keywords: "blog, aerospace, mechanical engineering, students",
  author: "Lockhoda Martin Team",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja" className={notoSansJP.className}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />

        {/* フォントのインポート */}
        {/*<link rel="stylesheet" href="https://use.typekit.net/xyt3nsh.css"></link> */}
        </head>
      <body>
        <div style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
          <Header className="nav-link" />
          <main>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html >
  );
}


// フォントのスクリプトを追加
/* (function(d) {
  var config = {
    kitId: 'qcw4ymu',
    scriptTimeout: 3000,
    async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a = this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){ }};s.parentNode.insertBefore(tk,s)
})(document); */
