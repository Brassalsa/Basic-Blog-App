import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { firebaseApp } from "@/utils/firebase";
import { slugify } from "./slugify";

const storage = getStorage(firebaseApp);

const uploadImg = ({ title = "", file, setMedia, cb }) => {
  const name = slugify(title);
  const storageRef = ref(storage, name + ".png");
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          break;
        case "storage/canceled":
          break;

        case "storage/unknown":
          break;
      }
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        setMedia(downloadURL);
        await cb(downloadURL);
      });
    }
  );
};

export default uploadImg;
