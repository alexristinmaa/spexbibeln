"use client";

import Link from "next/link";
import style from "./ListItem.module.css"
import { Song } from "@/app/types";

export default function ListItem({spexID, song} : {spexID: string, song: Song}) {
    const deleteSong = () => {
        const songName = prompt(`Do you really want to delete the spex '${song.name}'? (Type the spex name to confirm)`)

        if(songName != song.name) return alert("Delete aborted");

        // Delete song
        alert("Delete not implemented yet")
    }

    return (
        <div className={style.listItem}>
            <p>{song.name} - {song.edition}</p>
            <div className={style.listIcon}>
                <Link href={`/admin/edit/${spexID}/${song.id}`}><span className={style.edit}>Edit</span></Link>
                <span className={style.delete} onClick={deleteSong}>Delete</span>
            </div>
        </div>
    )
}