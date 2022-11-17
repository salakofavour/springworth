import Head from "next/head";
import { Navbar, Footer, Container } from "../components";
import Carousel from "../pageComponents/home/carousel";
import TopProductsContainer from "../pageComponents/home/TopProductsContainer";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Spring Worth Books</title>
        <meta name="description" content="Best place to buy and sell books" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />
        <Container>
          <Carousel />
          <TopProductsContainer />
        </Container>
        <Footer />
      </main>
    </div>
  );
}
