import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { AUTH_ROUTES, PROTECTED_ROUTES } from "@constants/router";
import { useAuthState } from "@hooks/useAuthProvider";
import { isClientContext } from "@utils";

const PageGuard = ({ children }) => {
  const auth = useAuthState();
  const router = useRouter();
  const { pathname } = router;

  if (!auth.rehydrating) {
    return null;
  }

  const checkRoute = useCallback((route, checker) => checker.includes(route), []);

  useEffect(() => {
    if (!auth.currentUser && isClientContext() && checkRoute(pathname, PROTECTED_ROUTES)) {
      router.replace("/login");
    }
    if (auth.currentUser && isClientContext() && checkRoute(pathname, AUTH_ROUTES)) {
      router.replace("/");
    }
  }, [auth.currentUser, pathname]);

  return <>{children} </>;
};

export default PageGuard;
