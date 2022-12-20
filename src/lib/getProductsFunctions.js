import { db } from "../config/firebase";
import toast from "react-hot-toast";
import {
  getDocs,
  query,
  where,
  orderBy,
  limit,
  collection,
  getCountFromServer,
  startAfter,
  updateDoc,
  doc,
} from "firebase/firestore";

export async function getUserProuducts(uid) {
  try {
    let data = [];

    const q = query(collection(db, "products"), where("userId", "==", uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
      // doc.data() is never undefined for query doc snapshots
    });

    return data;
  } catch (err) {
    toast.error(err.message);
  }
}

export async function getLatest3Products() {
  try {
    let data = [];
    const q = query(
      collection(db, "products"),
      orderBy("createdAt", "desc"),
      limit(3)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
      // doc.data() is never undefined for query doc snapshots
    });

    return data;
  } catch (err) {
    // toast.error(err.message);
    console.log(err.message);
  }
}

export async function getProductById(productId) {
  try {
    let data = [];
    const q = query(collection(db, "products"), where("slug", "==", productId));
    const product = await getDocs(q);
    product.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data[0];
  } catch (err) {
    return err.message;
  }
}

export async function getProductsByCategory(category) {
  try {
    let data = [];

    const q = query(
      collection(db, "products"),
      where("category", "==", category),
      orderBy("index", "desc"),
      limit(50)
    );

    const countQ = query(
      collection(db, "products"),
      where("category", "==", category)
    );

    const snap = (await getCountFromServer(countQ)).data().count;

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    const reald = { data, count: snap };
    return reald;
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
}

export async function getTop10ExpensiveProducts() {
  try {
    let data = [];
    const q = query(
      collection(db, "products"),
      orderBy("price", "desc"),
      limit(10)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
      // doc.data() is never undefined for query doc snapshots
    });

    return data;
  } catch (err) {
    // toast.error(err.message);
    return err.message;
  }
}

export async function getChepestProduct() {
  try {
    let data = [];
    const q = query(collection(db, "products"), orderBy("price"), limit(4));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function getProductsByCategoryNextBatch(category, key) {
  try {
    let data = [];
    const q = query(
      collection(db, "products"),
      where("category", "==", category),
      orderBy("index", "desc"),
      startAfter(key),
      limit(5)
    );

    const countQ = query(
      collection(db, "products"),
      where("category", "==", category)
    );

    const snap = (await getCountFromServer(countQ)).data().count;

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });

    const reald = { data, count: snap };

    return reald;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllProducts() {
  try {
    let data = [];

    const querySnapshot = await getDocs(collection(db, "products"));

    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
      // doc.data() is never undefined for query doc snapshots
    });

    return data;
  } catch (err) {
    // toast.error(err.message);
    console.log(err.message);
  }
}

export async function getAllProductsName() {
  try {
    let data = [];

    const querySnapshot = await getDocs(collection(db, "productsName"));

    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
      // doc.data() is never undefined for query doc snapshots
    });

    return data;
  } catch (err) {
    // toast.error(err.message);
    console.log(err.message);
  }
}

export async function addShowField() {
  let products = [];

  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    products.push({ ...doc.data(), id: doc.id });
  });
  products.forEach(async (item) => {
    await updateDoc(doc(db, "products", item.id), {
      isShow: true,
    });
  });
}
