import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseConfig } from '../config.js';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const increment = firebase.firestore.FieldValue.increment(1);
export const decrement = firebase.firestore.FieldValue.increment(-1);
export const db = firebase.firestore();
