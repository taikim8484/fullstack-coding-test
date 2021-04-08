import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Link, Stack, Text } from "@chakra-ui/layout";
import { useFormik } from "formik";

import { useAuthDispatch } from "@hooks/useAuthProvider";
import authService from "@service/auth";
import useToast from "@hooks/useToast";

export async function getStaticProps() {
  return {
    props: { title: "Sign Up" },
  };
}

const SignUp = () => {
  const { setUser } = useAuthDispatch();
  const { errorToast, successToast } = useToast();
  const onSubmit = async (values) => {
    const { email, password } = values;
    try {
      const { user } = await authService.signUp({ email, password });
      successToast("Register succeed", "Go to home..");
      setUser(user);
    } catch (error) {
      errorToast("Register failed", error.message);
    }
  };

  const { handleSubmit, handleChange, values, isSubmitting } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <>
      <Box minW="3xl" p="16" borderWidth="1px" borderRadius="lg" overflow="hidden" mb="8">
        <form onSubmit={handleSubmit}>
          <Stack spacing="4">
            <FormControl id="email">
              <FormLabel>email</FormLabel>
              <Input type="email" onChange={handleChange} value={values.email} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>password</FormLabel>
              <Input type="password" onChange={handleChange} value={values.password} />
            </FormControl>
            <Button isLoading={isSubmitting} colorScheme="teal" type="submit">
              register
            </Button>
          </Stack>
        </form>
      </Box>
      <Box flexDirection="row" display="flex" justifyContent="space-between" alignItems="center">
        <Text color="gray.500" isTruncated paddingX="4">
          Already have an account?
        </Text>
        <Link href="/login">
          <Button>login instead</Button>
        </Link>
      </Box>
    </>
  );
};

export default SignUp;
