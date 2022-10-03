const setStorage = (user, pass, id) => {
  localStorage.setItem('userName', user);
  localStorage.setItem('userPass', pass);
  localStorage.setItem('userId', id);
};
const getStorage = () => {
  const user = localStorage.getItem('userName');
  const type = localStorage.getItem('userType');
  const id = localStorage.getItem('userId');
  return { user, type, id };
};
export default { setStorage, getStorage };
