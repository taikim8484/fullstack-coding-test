import { useCallback, useState } from "react";
import { Button } from "@chakra-ui/button";

import { useAuthDispatch, useAuthState } from "@hooks/useAuthProvider";
import authService from "@service/auth";
import { Flex } from "@chakra-ui/layout";

const PageHeader = () => {
  const auth = useAuthState();
  const { resetUser } = useAuthDispatch();
  const [loading, setLoading] = useState(false);
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await authService.signOut();
      resetUser();
    } finally {
      setLoading(false);
    }
  }, []);

  if (!auth.currentUser) return null;

  return (
    <Flex flexDirection="row" p="4" w="100%" justifyContent="flex-end">
      <Button isLoading={loading} bg="tomato" w="80px" p={4} color="white" onClick={logout}>
        Logout
      </Button>
    </Flex>
  );
};
export default PageHeader;
