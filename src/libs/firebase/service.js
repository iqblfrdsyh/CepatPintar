import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./init";

const firestore = getFirestore(app);

export async function loginWithGoogle(data, callback) {
  try {
    const q = query(
      collection(firestore, "users"),
      where("email", "==", data.email)
    );

    const snapshot = await getDocs(q);

    const user = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (user.length > 0) {
      const existingUser = user[0];
      data.last_study = existingUser.last_study || new Date().toISOString();

      await updateDoc(doc(firestore, "users", existingUser.id), data);

      callback({ status: true, data: { ...existingUser, ...data } });
    } else {
      data.last_study = new Date().toISOString();
      const docRef = await addDoc(collection(firestore, "users"), data);

      callback({ status: true, data: { id: docRef.id, ...data } });
    }
  } catch (error) {
    console.error("Error in loginWithGoogle:", error);
    callback({ status: false, error: error.message });
  }
}
