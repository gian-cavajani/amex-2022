const setStorage = (user, type, id) => {
  localStorage.setItem('userName', user);
  localStorage.setItem('userType', type);
  localStorage.setItem('userId', id);
};
const getStorage = () => {
  const user = localStorage.getItem('userName');
  const type = localStorage.getItem('userType');
  const id = localStorage.getItem('userId');
  return { user, type, id };
};

const validatePass = (pass, pass2) => {
  const minNumberofChars = 6;
  const maxNumberofChars = 16;
  // const passRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  if (pass !== pass2 && pass2) {
    return [false, 'passwords should be equal'];
  }
  if (pass === '' || pass2 === '') {
    return [false, 'password shouldnt be empty'];
  }
  if (pass.length < minNumberofChars || pass.length > maxNumberofChars) {
    return [
      false,
      'password should have more than 6 characters and less than 16',
    ];
  }
  // if (!pass.match(passRegex)) {
  //   return [
  //     false,
  //     'password should contain atleast one number and one special character',
  //   ];
  // }
  return [true, 'ok'];
};

const validateEmail = (mail) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!mail.match(emailRegex)) {
    return [false, 'Invalid email'];
  }
  if (mail === '') {
    return [false, 'email shouldnt be empty'];
  }
  return [true, 'ok'];
};

export default { setStorage, getStorage, validatePass, validateEmail };
