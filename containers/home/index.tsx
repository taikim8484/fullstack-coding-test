import { useRef } from "react";
import { Box, Input } from "@chakra-ui/react";

import DynamicText from "./components/DynamicText";

export async function getStaticProps() {
  return {
    props: { title: "Home" },
  };
}

const Home = () => {
  const dynamicTextRef = useRef(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dynamicTextRef.current.changeValue(e.target.value);
  };

  return (
    <Box width="xs">
      <DynamicText ref={dynamicTextRef} />
      <Input w="100%" onChange={onChange} placeholder="...." />
    </Box>
  );
};

export default Home;
