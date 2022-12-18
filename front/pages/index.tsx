import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  data: {
    dolar: number;
    uf: number;
    temperature: number;
    crossword: string;
  };
}
export default function Home({
  data: { dolar, uf, temperature, crossword },
}: HomeProps) {
  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Acá va:
            <code className={styles.code}> {dolar}</code>
          </p>
          <p>
            También va:
            <code className={styles.code}> {uf}</code>
          </p>
          <p>
            Y también:
            <code className={styles.code}> {temperature}</code>
          </p>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/god.png"
            alt="Next.js Logo"
            width={300}
            height={300}
            priority
          />
          {/* <p> Perdón rolito no soy bueno en esto :( </p> */}
        </div>

        <div className={styles.description}>
          <p>
            Acá va el crucigrama:
            <code className={styles.code}>
              {" "}
              <a href={crossword}> {crossword}</a>
            </code>
          </p>

          {/* <p>Aquí un buenos día profe para que se vea bonito</p> */}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const API_URL = process.env.API_URL || "http://localhost:8080";
  const [{ dolar }, { uf }, { temperature }, { crossword }] = await Promise.all(
    [
      fetch(`${API_URL}/dolar`).then((res) => res.json()),
      fetch(`${API_URL}/uf`).then((res) => res.json()),
      fetch(`${API_URL}/temperature`).then((res) => res.json()),
      fetch(`${API_URL}/crossword`).then((res) => res.json()),
    ]
  );

  return {
    props: {
      data: { dolar, uf, temperature, crossword },
    },
  };
}
