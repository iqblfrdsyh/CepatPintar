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

export async function loginWithGoogle(data) {
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
    data.last_study = existingUser.last_study || ""; 

    await updateDoc(doc(firestore, "users", existingUser.id), data);

    return { ...existingUser, ...data }; 
  } else {
    data.last_study = ""; 
    const docRef = await addDoc(collection(firestore, "users"), data); 

    return { ...data, id: docRef.id }; 
  }
}
