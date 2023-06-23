import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { Inter } from 'next/font/google'

import stylesGlobal from '@/assets/styles/Globals.module.css'
import stylesHome from '@/assets/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Head>
      <title>Darkgrooves</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="description" content="Thetatix web app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <div className='container'>
        <div className={stylesHome.content}>
          <div className={stylesHome.row + " row"}>
            <div className="col-5">
              <p className={stylesGlobal.title + " mb-2"}>Connect, collaborate & trade beats</p>
              <p className={stylesGlobal.subtitle + " mb-4"}>Powered by Fantom Network</p>
              <div className='d-flex gap-3'>
                <Link href='/explore' className={stylesGlobal.btnTypeOne}>
                  Start exploring
                </Link>
                <Link href='https://github.com/darkgroove-org' className={stylesGlobal.btnTypeTwo} target='_blank'>
                  Learn more
                </Link>
              </div>
              
            </div>
            <div className="col-7 d-flex justify-content-center align-items-center">
              <Image
                  src="/imgs/landing-img.png"
                  alt='Landing page image'
                  width={600}
                  height={50}
                  priority   
                />
            </div>
          </div>
        </div>
        
      </div>
    </main>
    </>
  )
}
