import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import UserDashboard from "./UserDashboard";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bandit CLub</title>
        <meta
          content="Bandity Club is a community of people who are passionate about the NFT space. We are a group of artists, developers, and collectors who are dedicated to creating a fun and welcoming environment for everyone."
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <UserDashboard />
      </main>
      <footer className={styles.footer}>
        <a
          href="https://moalobaidi.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Bandit Club 🤑
        </a>
      </footer>
    </div>
  );
};

export default Home;
