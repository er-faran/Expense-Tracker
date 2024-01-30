export const logoutHandler = (callback = () => {}) => {
  localStorage.setItem("selectedTab", "5");
  localStorage.setItem("user", null);
  if (callback) {
    callback();
  }
};
