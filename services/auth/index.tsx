import Api from "@service/api";
import { auth } from "config/firebase";

const signUp = async ({ email, password, name, dateOfBirth }) => {
  const { user } = await auth.createUserWithEmailAndPassword(email, password);
  const idToken = await user.getIdToken();
  await Api({
    url: "/auth/sign-up",
    method: "POST",
    data: {
      idToken,
      name,
      dateOfBirth,
    },
  });
};

const signIn = async ({ email, password }) => {
  const { user } = await auth.signInWithEmailAndPassword(email, password);
  const idToken = await user.getIdToken();
  const response = await Api({
    url: "/auth/sign-in",
    method: "POST",
    data: {
      idToken,
    },
  });
  return response.data;
};

const signOut = async () => {
  await auth.signOut();
  await Api({
    url: "/auth/sign-out",
    method: "POST",
  });
};

export default {
  signIn,
  signUp,
  signOut,
};
