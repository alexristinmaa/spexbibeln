// utils/db

import firestore, { getFirestore, collection, doc, getDocs, getDoc, addDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore"
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

const addSong = async (groupId: string, song: Song) => {
  return await updateDoc(db.group(groupId), {
    songs: arrayUnion(song)
  });
}

const addGroup = async (groupId: string, group: Group) => {
  return await setDoc(db.group(groupId), group);
}

const updateSong = async (groupId: string, song: Partial<Song>) => {
  const group = await getGroup(groupId)
  console.log(group!.songs)

  const index = group!.songs.findIndex(s => s.id == song.id && s.edition == song.edition)
  console.log(index)
  const newSongs = [...(group!.songs)]

  newSongs[index] = {...newSongs[index], ...song} // Combine the two, using the new fields from the updates

  await updateDoc(
    db.group(groupId), 
    {
      songs: newSongs
    }
  )
}

const updateGroup = async (groupId: string, group: Partial<Group>) => {
  return await updateDoc(db.group(groupId), group)
}

export { getGroups, getGroup, addSong, addGroup, updateSong, updateGroup}