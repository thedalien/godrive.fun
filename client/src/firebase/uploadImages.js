import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./config";


const uploadImageToFirebase = async (carData, selectedFiles, setUploadProgress) => {
    if (!selectedFiles) {
        return;
    }

    let localDownloadURLs = [];

    const uploadPromises = Array.from(selectedFiles).map(async selectedFile => {
        const storageRef = ref(storage, `carImages/${carData.licensePlate}/` + selectedFile.name);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile, {
            contentType: selectedFile.type,
        });

        await new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                }, 
                (error) => {
                    console.error(error);
                    reject(error);
                }, 
                async () => {
                    try {
                        const originalURL = await getDownloadURL(uploadTask.snapshot.ref);
                        const baseNameWithoutExtension = originalURL.split('/').pop().split('?')[0];
                        const newFileName = baseNameWithoutExtension.replace(/(\.\w+)$/, "_300x300.webp");
                        const transformedURL = originalURL.replace(baseNameWithoutExtension, newFileName);
                        localDownloadURLs.push(transformedURL);
                        resolve();
                    } catch (error) {
                        console.error(error);
                        reject(error);
                    }
                }
            );
        });
    });

    // Wait for all uploads to complete
    await Promise.all(uploadPromises);

    return localDownloadURLs;
};

export default uploadImageToFirebase;