// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAVOqm2RjCokn1aAgXs85hxupmyVWNA-cQ",
//   authDomain: "imageupdatedb.firebaseapp.com",
//   projectId: "imageupdatedb",
//   storageBucket: "imageupdatedb.appspot.com",
//   messagingSenderId: "640036381047",
//   appId: "1:640036381047:web:13ba29c6b5c7ba260b8172",
// };

// const app = initializeApp(firebaseConfig);
// export const imageDB = getStorage(app);


import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAVOqm2RjCokn1aAgXs85hxupmyVWNA-cQ",
  authDomain: "imageupdatedb.firebaseapp.com",
  projectId: "imageupdatedb",
  storageBucket: "imageupdatedb.appspot.com",
  messagingSenderId: "640036381047",
  appId: "1:640036381047:web:13ba29c6b5c7ba260b8172",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const imageDB = getStorage(app);


export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BKkgwsx0IisCii0pfI5O6rJvwlEe9KIcCOGutl0o_FelrHkKqax4-1KF4YVYYkiOlaV53iO-ofWxOFqjLvyspOg",
    });
    console.log(token);
  }
};
