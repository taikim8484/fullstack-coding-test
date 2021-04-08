import { auth } from "config/firebase";

const signUp = async ({ email, password }) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

const signIn = async ({ email, password }) => {
  return auth.signInWithEmailAndPassword(email, password);
};

const signOut = async () => {
  return auth.signOut();
};

export default {
  signIn,
  signUp,
  signOut,
};
