import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

// This is the service account key you download from Firebase Console
// IMPORTANT: DO NOT hardcode this in your code. Use environment variables.
const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountString) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.');
}

const serviceAccount = JSON.parse(serviceAccountString);

// Initialize Firebase Admin only if it hasn't been initialized yet
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// This is a sample API route.
// You can create more files in this directory to handle different admin tasks.
// For example, /api/admin/send-notification or /api/admin/manage-users
export async function GET(request: Request) {
  try {
    // Example: List all users (first 10)
    // This is an admin action that requires the Admin SDK.
    const userRecords = await admin.auth().listUsers(10);
    const users = userRecords.users.map((user) => user.toJSON());

    return NextResponse.json({ 
      message: 'Firebase Admin SDK initialized successfully!',
      users: users,
    });
  } catch (error: any) {
    console.error('Firebase Admin API error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
