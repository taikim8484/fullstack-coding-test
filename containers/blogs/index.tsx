import { useEffect, useMemo, useRef, useState } from "react";
import { Link, SimpleGrid } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

import BlogsEmitter from "@repos/blogs";

import BlogModal from "./components/BlogModal";
import BlogCard from "./components/BlogCard";

export async function getStaticProps() {
  return {
    props: { title: "Blog" },
  };
}

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const blogsEmitter = useMemo(() => new BlogsEmitter(), []);

  useEffect(() => {
    blogsEmitter.subscribe();
    return () => {
      blogsEmitter.unsubcribe();
    };
  }, []);

  useEffect(() => {
    blogsEmitter.on("data", (data) => setBlogs(data));
    blogsEmitter.on("error", (error) => alert(error.message));
    return () => {
      blogsEmitter.off("data", (data) => setBlogs(data));
      blogsEmitter.off("error", (error) => alert(error.message));
    };
  }, []);

  const modalRef = useRef(null);

  if (!blogs.length) {
    return <Image src="https://www.meme-arsenal.com/memes/0c7acd7f215dceb648e1b1e57b9dc1b3.jpg" />;
  }

  return (
    <>
      <BlogModal ref={modalRef} />
      <SimpleGrid columns={4} spacingX="40px" spacingY="20px">
        {blogs.map((item) => (
          <Link onClick={() => modalRef.current?.open(item)}>
            <BlogCard {...item} />
          </Link>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Blogs;
