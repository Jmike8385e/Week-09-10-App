import { db } from "../firebase";
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
const addEventEntry = async ({ userId, title, date, attendance }) => {
    try {
        await addDoc(collection(db, "event"), {
            user: userId,
            title: title,
            date: date,
            attendance: attendance,
            createdAt: new Date().getTime(),
        });
    } catch (err) { }
};
const toggleEventAttendance = async ({ docId, attendance }) => {
    try {
        const eventRef = doc(db, "event", docId);
        await updateDoc(eventRef, {
            attendance,
        });
    } catch (err) {
        console.log(err);
    }
};
const deleteEvent = async (docId) => {
    try {
        const eventRef = doc(db, "event", docId);
        await deleteDoc(eventRef);
    } catch (err) {
        console.log(err);
    }
};
export { addEventEntry, toggleEventAttendance, deleteEvent };