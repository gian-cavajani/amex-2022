const setStorage = (user, pass, id) => {
  localStorage.setItem('userName', user);
  localStorage.setItem('userPass', pass);
  localStorage.setItem('userId', id);
};
const getStorage = () => {
  const user = localStorage.getItem('userName');
  const pass = localStorage.getItem('userPass');
  const id = localStorage.getItem('userId');
  return { user, pass, id };
};
export default { setStorage, getStorage };
