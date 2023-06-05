import { initializeApp } from 'firebase/app'; // Optionally import the services that you want to use
import { getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

// import {...} from "firebase/database";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
const projectId = 'basiligo-52446';
const senderId = '949195304615';
const apiKey = 'AIzaSyDf-UiCDJH2I-5PRD2qoxGLWplDpzurBFw';
const appId = '1:949195304615:web:8edd449adce8a6dc757582';
const gMeasurementId = 'G-36XCJNHLZ2';
// Initialize Firebase
const firebaseConfig = {
	apiKey: apiKey,
	authDomain: `${projectId}.firebaseapp.com`,
	databaseURL: `https://${projectId}.firebaseio.com`,
	projectId: `${projectId}`,
	storageBucket: `${projectId}.appspot.com`,
	messagingSenderId: senderId,
	appId: appId,
	measurementId: gMeasurementId,
};
// set Initialised app to 'app' constant
const app = initializeApp(firebaseConfig);
//set authenticaion service to 'auth' constant
const auth = getAuth(app);
//database
const db = getFirestore(app);

export { Firestore, auth, db };

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
