
export const firebaseConfig = {
  apiKey: "AIzaSyCEQiDwYCrFvVab3734RE4chnjMa5WXJPk",
  authDomain: "studio-8560157638-2b605.firebaseapp.com",
  projectId: "studio-8560157638-2b605",
  storageBucket: "studio-8560157638-2b605.firebasestorage.app",
  messagingSenderId: "1067037464109",
  appId: "1:1067037464109:web:5eb352d80f4e7aba478aa4"
};

export const isFirebaseConfigValid = () => {
  return !!(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);
};
