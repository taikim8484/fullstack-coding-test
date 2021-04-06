import Head from "next/head";
import { Box, Input } from "@chakra-ui/react";
import { useRef } from "react";

import styles from "styles/Home.module.css";
import DynamicText from "components/DynamicText";

const Home = () => {
  const dynamicTextRef = useRef(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dynamicTextRef.current.changeValue(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Box width="xs">
          <DynamicText ref={dynamicTextRef} />
          <Input w="100%" onChange={onChange} placeholder="...." />
        </Box>
      </main>
    </div>
  );
};

export default Home;
