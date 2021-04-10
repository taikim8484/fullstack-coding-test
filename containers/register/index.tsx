import { Button } from "@chakra-ui/button";
import { chakra } from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Box, Link, Stack, Text } from "@chakra-ui/layout";

import { useFormik } from "formik";
import DatePicker from "react-datepicker";

const StyledDatePicker = chakra(DatePicker);

import authService from "@service/auth";
import useToast from "@hooks/useToast";
import { useRouter } from "next/router";

export async function getStaticProps() {
  return {
    props: { title: "Sign Up" },
  };
}

const SignUp = () => {
  const router = useRouter();
  const { errorToast, successToast } = useToast();
  const onSubmit = async (values) => {
    const { email, password, name, dateOfBirth } = values;
    try {
      await authService.signUp({ email, password, name, dateOfBirth });
      successToast("Register succeed", "Go to home..");
      router.replace("/login");
    } catch (error) {
      errorToast("Register failed", error.message);
    }
  };

  const { handleSubmit, setFieldValue, handleChange, values, isSubmitting } = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      dateOfBirth: new Date(),
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
            <FormControl id="name">
              <FormLabel>name</FormLabel>
              <Input type="name" onChange={handleChange} value={values.name} />
            </FormControl>
            <FormControl id="dateOfBirth">
              <FormLabel>birthday</FormLabel>
              <StyledDatePicker
                border="wheat"
                selected={values.dateOfBirth}
                onChange={(value) => {
                  setFieldValue("dateOfBirth", value);
                }}
              />
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
