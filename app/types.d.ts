import { DocumentReference } from "firebase/firestore"

type DBGroup = {
    id: string,
    data: Group
}

type DBSong = {
    name: string,
    lyrics: string,
    group: DocumentReference
}

type Group = {
    name: string,
    year: number,
    eller: string,
    color: string,
    songs: Song[]
}

type Song = {
    id: string,
    name: string,
    comments: string,
    lyrics: string,
    melody: string,
    edition: string
}