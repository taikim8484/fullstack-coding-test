import { Box } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

const BlogCard = ({ img, title }) => {
  return (
    <Box maxH="xl" maxW="xs" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={img} />
      <Box p="6">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {title}
        </Box>
      </Box>
    </Box>
  );
};

export default BlogCard;
