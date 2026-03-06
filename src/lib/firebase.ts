import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCK04kh06aX0xqPCTMFEENBZWlEktY9Xs",
  authDomain: "studentsathi-web.firebaseapp.com",
  projectId: "studentsathi-web",
  storageBucket: "studentsathi-web.firebasestorage.app",
  messagingSenderId: "261128024418",
  appId: "1:261128024418:web:db6def1b5e696143c93c3b",
  measurementId: "G-5M87PKQGX9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
