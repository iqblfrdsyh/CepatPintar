import {
  addDoc,
  collection,
  doc,
  getDoc,
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
      data.activity_points = existingUser.activity_points || 0;

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

export async function getAllUsers() {
  try {
    const usersCollection = collection(firestore, "users");
    const snapshot = await getDocs(usersCollection);
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { status: true, total: users.length, users };
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    throw new Error(error.message);
  }
}

export async function updateUserActivity(id, callback) {
  try {
    const userRef = doc(firestore, "users", id);

    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const user = userSnapshot.data();

      const currentPoints = user.activity_points || 0;

      const updatedData = {
        activity_points: currentPoints + 5,
        last_study: new Date().toISOString(),
      };

      await updateDoc(userRef, updatedData);

      callback({
        status: true,
        message: "Last study and points updated successfully",
        last_study: updatedData.last_study,
        points: updatedData.activity_points,
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error in updateUserActivity:", error);
    callback({ status: false, error: error.message });
  }
}
