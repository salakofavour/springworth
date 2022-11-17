import { toast } from "react-toastify";
import { db, auth, storage } from "../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  setDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";

export async function handleImageUpload(file, setProgress, uid) {
  try {
    let url = "";
    let x = Math.random() * 100;
    const fullName = file.name + x;
    const useStorage = storage;
    const storageRef = ref(useStorage, fullName);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress - 10);
      },
      (err) => {
        toast.error(err.message);
      },
      async () => {
        url = await getDownloadURL(uploadTask.snapshot.ref);

        await updateDoc(doc(db, "users", uid), {
          imgUrl: url,
        });
        setProgress(100);
      }
    );
  } catch (err) {
    toast.error(err.message);
  }
}

export async function handleSignup(name, email, password, img, setProgress) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const stripeId = await (
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stripe/createCustomers?email=${email}`
      )
    ).json();

    if (!stripeId?.id) {
      return false;
    }

    if (img) {
      await handleImageUpload(img, setProgress, userCredential?.user?.uid);
    }

    const userData = {
      name: name,
      email: email,
      time: serverTimestamp(),
      stripe_customerId: stripeId.id,
      uid: userCredential.user.uid,
      subscription: null,
      imgUrl:
        !img &&
        "https://res.cloudinary.com/dtme6qv4c/image/upload/v1668508685/610-6104451_placeholder-png.png",
    };

    await setDoc(doc(db, "users", userCredential.user.uid), userData);

    toast.success("account created");

    return true;
  } catch (err) {
    console.log(err.message);
    toast.error(err.message);
    return false;
  }
}

export async function handleSignin(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("sign in successfully");
    return true;
  } catch (err) {
    toast.error(err.message);
    console.log(err.message);
    return false;
  }
}

export async function handleForgotPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Password reset email send");
    return true;
  } catch (err) {
    toast.error(err.message);
    return false;
  }
}

export async function handleEmailUpdate(updatedEmail) {
  try {
    await updateEmail(auth.currentUser, updatedEmail);
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, {
      email: updatedEmail.toString(),
    });
    toast.success("email updated sucessfully");
    return true;
  } catch (err) {
    console.log(err.message);
    toast.error(err.message);
    return false;
  }
}

export async function handlePasswordUpdate(user, updatedPassword) {
  try {
    await updatePassword(user, updatedPassword);
    return true;
  } catch (err) {
    toast.error(err.message);
    console.log(err.message);
    return false;
  }
}

export async function handleNameUpdate(updatedName) {
  try {
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, {
      name: updatedName.toString(),
    });
    toast.success("Name updated");
    return true;
  } catch (err) {
    toast.error(err.message);
    return false;
  }
}

export async function handlePhoneUpdate(updatePhone) {
  try {
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, {
      phoneNo: updatePhone,
    });
    toast.success("Phone-No updated");
    return true;
  } catch (err) {
    toast.error(err.message);
    return false;
  }
}

export async function getAllAddress(id) {
  try {
    let data = [];
    const querySnapshot = await getDocs(collection(db, "users", id, "address"));
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
      // doc.data() is never undefined for query doc snapshots
    });

    return data;
  } catch (err) {
    toast.error(err.message);
  }
}

export async function getSingleAddress(uid, id) {
  try {
    const data = await getDoc(doc(db, "users", uid, "address", id));
    return data.data();
  } catch (err) {
    toast.error(err.message);
    return false;
  }
}

export async function handleAddNewAddress(address) {
  try {
    await setDoc(
      doc(db, "users", auth.currentUser.uid, "address", address.city),
      address
    );
    toast.success("New address added");
    return true;
  } catch (err) {
    toast.error(err.message);
    return false;
  }
}

export async function handleUpdateAddress(id, data) {
  try {
    const uId = getAuth().currentUser?.uid;
    await updateDoc(
      doc(db, "users", uId ? uId : "0F2Uh2INGOo1xjq7LuUI", "address", id),
      data
    );
    toast.success("Address updated");
    return true;
  } catch (err) {
    toast.error(err.message);
    return false;
  }
}

export async function handleAddressDelete(id) {
  try {
    const uId = getAuth().currentUser?.uid;
    await deleteDoc(
      doc(db, "users", uId ? uId : "0F2Uh2INGOo1xjq7LuUI", "address", id)
    );
    toast.success("Address deleted");
    return true;
  } catch (err) {
    toast.error(err.message);
    return false;
  }
}

export async function getCurrentUserFromDb(id) {
  const userDoc = await getDoc(doc(db, "users", id));
  const user = userDoc.data();
  return user;
}

export async function handleUpdateUserSubscriptionStatus(subscription, uid) {
  const data = {
    planEnd: subscription?.current_period_end,
    planStart: subscription?.current_period_start,
    stripCustomerId: subscription?.customer,
    subscriptionId: subscription?.id,
    paymentMethod: subscription?.default_payment_method,
    status: subscription?.status,
  };

  try {
    await updateDoc(doc(db, "users", uid), {
      subscription: data,
    });
  } catch (err) {
    console.log(err.message);
  }
}

export async function getAddressByProduct(id) {
  try {
    let data = [];
    const querySnapshot = await getDocs(collection(db, "users", id, "address"));

    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });

    return data[0];
  } catch (err) {
    toast.error(err.message);
    return false;
  }
}
