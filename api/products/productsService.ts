import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../config";

const productCollectionRef = collection(db, "products")
export class ProductService {
  async createProduct(product: any) {
    return (await addDoc(productCollectionRef, product)).id
  }

  async listProduct(companyId: string) {
    const products: any[] = [];
    const q = query(productCollectionRef, where("companyId", "==", companyId));
    const response = (await getDocs(q)).forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  }
}