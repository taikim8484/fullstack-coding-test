import { useToast as _useToast } from "@chakra-ui/toast";

const useToast = () => {
  const toast = _useToast();
  const errorToast = (title, description) =>
    toast({
      title,
      description,
      status: "error",
      duration: 5000,
      isClosable: true,
    });

  const successToast = (title, description) =>
    toast({
      title,
      description,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

  return {
    errorToast,
    successToast,
  };
};

export default useToast;
