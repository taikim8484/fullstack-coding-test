import "styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import PageWrapper from "@components/PageLayout";
import PageGuard from "@components/PageGuard";
import { AuthProvider } from "@hooks/useAuthProvider";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ChakraProvider>
        <PageWrapper title={pageProps.title}>
          <PageGuard>
            <Component {...pageProps} />
          </PageGuard>
        </PageWrapper>
      </ChakraProvider>
    </AuthProvider>
  );
};

export default MyApp;
