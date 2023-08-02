export const changeName = () => {
  const input = prompt("Enter your beautiful name:");
  if (!input) {
    const localName = localStorage.getItem("name");
    if (localName) {
      return false;
    } else {
      localStorage.setItem("name", "GUEST");
      return true;
    }
  } else {
    localStorage.setItem("name", input);
    return true;
  }
};
