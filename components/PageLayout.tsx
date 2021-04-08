import Head from "next/head";
import styles from "@styles/PageLayout.module.css";
import PageHeader from "./PageHeader";

const PageLayout = ({ children, title }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageHeader />

      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default PageLayout;
