import { auth, db, storage } from "../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  doc,
  updateDoc,
  setDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";

import { toast } from "react-toastify";
import { slugify } from "./helper";
import { getUserProuducts, getAllProductsName } from "./getProductsFunctions";

async function handleImageUpload(file, setProgress, productSlug) {
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

        await updateDoc(doc(db, "products", productSlug), {
          imgUrl: url,
        });
        setProgress(100);
      }
    );
  } catch (err) {
    toast.error(err.message);
  }
}

export async function handleProductUpload(
  data,
  imgFile,
  setProgress,
  uid,
  subscriptionStatus
) {
  try {
    if (subscriptionStatus === "active") {
      return UploadProduct(data, imgFile, setProgress);
    }

    if (subscriptionStatus === "canceled") {
      const usersProudct = await getUserProuducts(uid);
      const userProductsLength = usersProudct?.length;
      if (userProductsLength >= 3) {
        return toast.error(
          "Please subscribe to premium to upload more products"
        );
      } else {
        return UploadProduct(data, imgFile, setProgress);
      }
    }

    if (subscriptionStatus === undefined) {
      const usersProudct = await getUserProuducts(uid);
      const userProductsLength = usersProudct?.length;
      if (userProductsLength >= 3) {
        return toast.error(
          "Please subscribe to premium to upload more products"
        );
      } else {
        return UploadProduct(data, imgFile, setProgress);
      }
    }
  } catch (err) {
    toast.error(err.message);
    return false;
  }
}

async function UploadProduct(data, imgFile, setProgress) {
  try {
    const check = await checkNameExist(data.name);
    if (check) {
      toast.error("Name exits");
      return;
    }

    const totalProducts = await getAllProductsName();
    const currentProductIndex = totalProducts.length + 1;

    const productSlug = slugify(data.name);

    await setDoc(doc(db, "products", productSlug), {
      ...data,
      slug: productSlug,
      price: parseFloat(data.price),
      createdAt: serverTimestamp(),
      userId: auth.currentUser.uid,
      index: currentProductIndex,
    });

    await setDoc(doc(db, "productsName", productSlug), {
      name: data.name,
    });

    await handleImageUpload(imgFile, setProgress, productSlug);
  } catch (err) {
    console.log(err.message);
  }
}

export async function checkNameExist(name) {
  const allProducts = await getAllProductsName();
  const checkName = allProducts.filter(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  )[0];
  if (checkName) {
    return true;
  }
  return false;
}

export async function deleteProduct(id) {
  try {
    await deleteDoc(doc(db, "products", id));
    await deleteDoc(doc(db, "productsName", id));
    toast.success("Item deleted");
  } catch (err) {
    toast.error(err);
  }
}

export async function handleEditProduct(
  productId,
  data,
  selectedImgFile,
  setProgress,
  isNameEdit
) {
  try {
    if (isNameEdit) {
      const check = await checkNameExist(data.name);
      if (check) {
        toast.error("Name exits");
        return;
      }
    }

    const newProductId = slugify(data.name);

    await updateDoc(doc(db, "products", productId), {
      ...data,
      slug: newProductId,
      price: parseFloat(data.price),
      createdAt: serverTimestamp(),
    });

    await updateDoc(doc(db, "productsName", productId), {
      name: data.name,
    });

    if (selectedImgFile) {
      await handleImageUpload(selectedImgFile, setProgress, productId);
    }

    toast.success("Product edited");

    return true;
  } catch (err) {
    toast.error(err.message);
    return false;
  }
}
