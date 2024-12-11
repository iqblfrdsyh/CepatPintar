import { getFirestore } from "firebase/firestore";
import app from "./firebase/init";

const firestore = getFirestore(app);

export async function checkLastStudy(userId) {
  try {
    const userRef = doc(firestore, "users", userId);
    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
      const lastStudyTimestamp = snapshot.data().last_study;

      if (lastStudyTimestamp) {
        const lastStudyDate = lastStudyTimestamp.toDate();
        const now = new Date();

        const diffInMs = now - lastStudyDate;

        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        console.log(`User sudah tidak mengakses selama ${diffInDays} hari.`);
        return diffInDays;
      } else {
        console.log("User belum memiliki data last_study.");
        return null;
      }
    } else {
      console.log("User tidak ditemukan.");
      return null;
    }
  } catch (error) {
    console.error("Error checking last_study:", error);
    return null;
  }
}
