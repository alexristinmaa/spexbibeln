// utils/db

import firestore, { getFirestore, collection, doc, getDocs, getDoc } from "firebase/firestore"
import { app } from "./firebase";
import { Song, Group, DBSong, DBGroup } from "./types";

const fsRef = getFirestore(app);

const converter = <T>() => ({
  toFirestore: (data: T) => data as firestore.DocumentData,
  fromFirestore: (snap: firestore.QueryDocumentSnapshot) =>
    snap.data() as T
});

const dataPoint = <T>(collectionPath: string) => collection(fsRef, collectionPath).withConverter(converter<T>());
const dataPointDoc = <T>(collectionPath: string, docId: string) => doc(fsRef, collectionPath, docId).withConverter(converter<T>());

const db = {
  groups: dataPoint<Group>('groups'),
  song: (songId: string) => dataPointDoc<DBSong>('songs', songId),
  group: (groupId: string) => dataPointDoc<Group>('groups', groupId)
}

const getGroups = async () => {
  return (await getDocs(db.groups)).docs.map(doc => ({data: doc.data(), id: doc.id} as DBGroup));
}


const getGroup = async (id: string) => {
  return (await getDoc(db.group(id))).data()
}

export { getGroups, getGroup }