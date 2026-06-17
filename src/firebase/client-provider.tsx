
'use client';

import React, { useMemo } from 'react';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig, isFirebaseConfigValid } from './config';
import { FirebaseProvider } from './provider';

export const FirebaseClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const firebaseData = useMemo(() => {
    // Jika config tidak valid, kita tidak mencoba inisialisasi untuk menghindari crash
    if (!isFirebaseConfigValid()) {
      console.error("Firebase Configuration is missing. Please check your .env file.");
      return null;
    }

    try {
      const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const auth = getAuth(app);
      return { app, db, auth };
    } catch (error) {
      console.error("Error initializing Firebase:", error);
      return null;
    }
  }, []);

  if (!firebaseData) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl font-bold text-primary mb-2">Konfigurasi Firebase Tidak Ditemukan</h1>
        <p className="text-muted-foreground max-w-md">
          Pastikan Anda telah mengisi file <code className="bg-muted px-1 rounded">.env</code> dengan API Key dan Project ID yang benar dari Firebase Console.
        </p>
      </div>
    );
  }

  return (
    <FirebaseProvider firebaseApp={firebaseData.app} firestore={firebaseData.db} auth={firebaseData.auth}>
      {children}
    </FirebaseProvider>
  );
};
