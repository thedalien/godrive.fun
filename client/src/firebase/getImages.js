import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

const getImages = async (path) => {
  const storageRef = ref(storage, path);
  const files = await listAll(storageRef);
  const imageURLs = await Promise.all(files.items.map(async (fileRef) => {
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  }));
  return imageURLs;
};

export default getImages;