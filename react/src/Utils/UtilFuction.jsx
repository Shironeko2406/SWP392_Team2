const TOKEN_AUTHOR = "accessToken";
const USER_LOGIN = "userLogin";
const HOST_DOMAIN =
  "https://localhost:7194";
  // "http://ec2-18-141-87-114.ap-southeast-1.compute.amazonaws.com";

//  Cookie and local storage interaction functions

const getDataTextStorage = (storeName) => {
  if (localStorage.getItem(storeName)) {
    return localStorage.getItem(storeName);
  }
  return null;
};

const getDataJSONStorage = (storeName) => {
  if (localStorage.getItem(storeName)) {
    return JSON.parse(localStorage.getItem(storeName));
  }
  return null;
};

const setDataTextStorage = (storeName, data) => {
  localStorage.setItem(storeName, data);
};

const setDataJSONStorage = (storeName, data) => {
  localStorage.setItem(storeName, JSON.stringify(data));
};

const removeDataTextStorage = (storeName) => {
  localStorage.removeItem(storeName);
};

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function deleteCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export {
  getDataTextStorage,
  getDataJSONStorage,
  setDataTextStorage,
  setDataJSONStorage,
  removeDataTextStorage,
  setCookie,
  getCookie,
  deleteCookie,
  getCurrentDateTime,
  TOKEN_AUTHOR,
  USER_LOGIN,
  HOST_DOMAIN
};
