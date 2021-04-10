import Api from "@service/api";

const me = async () => {
  const response = await Api({
    url: "/users/me",
    method: "GET",
  });
  return response.data;
};

export default {
  me,
};
