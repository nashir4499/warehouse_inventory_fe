export default function authHeader() {
  // const user = JSON.parse(localStorage.getItem('token'));
  const user = localStorage.getItem("token");
  // console.log(user.accessToken)
  if (user) {
    return { Authorization: "Bearer " + user };
  } else {
    return {};
  }
}
