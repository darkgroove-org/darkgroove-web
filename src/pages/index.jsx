import Image from 'next/image'
import Head from 'next/head'
import { Inter } from 'next/font/google'

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
      <div>
        <h1>Connect, collaborate & trade beats</h1>
        <p>Powered by Fantom Network</p>
        <a href="#">Start exploring</a>
        <a href="#">Learn more</a>
      </div>
    </main>
    </>
  )
}
