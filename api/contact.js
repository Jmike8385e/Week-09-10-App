import { db } from "../firebase";
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
const addContact = async ({ userId, name, phone, email, address, city, state, zip }) => {
    try {
        await addDoc(collection(db, "contact"), {
            user: userId,
            name: name,
            phone: phone,
            email: email,
            address: address,
            city: city,
            state: state,
            zip: zip,    
            createdAt: new Date().getTime(),
        });
    } catch (err) { }
};
const toggleContactStatus = async ({ docId, status }) => {
    try {
        const contactRef = doc(db, "contact", docId);
        await updateDoc(contactRef, {
            status,
        });
    } catch (err) {
        console.log(err);
    }
};
const deleteContact = async (docId) => {
    try {
        const contactRef = doc(db, "contact", docId);
        await deleteDoc(contactRef);
    } catch (err) {
        console.log(err);
    }
};
export { addContact, toggleContactStatus, deleteContact };