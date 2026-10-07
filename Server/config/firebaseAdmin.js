import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

export const getFirebaseAdminAuth = () => {
  let app = getApps()[0];

  if (!app) {
    let credential;
    let serviceAccount;
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

    if (serviceAccountJson) {
      try {
        serviceAccount = JSON.parse(serviceAccountJson);
        credential = cert(serviceAccount);
      } catch (err) {
        console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON:", err.message);
      }
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      credential = applicationDefault();
    }

    const projectId = process.env.FIREBASE_PROJECT_ID || serviceAccount?.project_id || "clickyatra-29af9";

    const appOptions = {};
    if (credential) {
      appOptions.credential = credential;
    }
    if (projectId) {
      appOptions.projectId = projectId;
    }

    if (!appOptions.credential && !appOptions.projectId) {
      throw new Error("Firebase Admin credentials or project ID are missing");
    }

    app = initializeApp(appOptions);
  }

  return getAuth(app);
};