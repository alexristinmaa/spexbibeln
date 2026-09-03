"use client";

import Link from "next/link";
import style from "./ListItem.module.css"
import { Song } from "@/app/types";
import { deleteSong } from "@/app/util";

export default function ListItem({spexID, song} : {spexID: string, song: Song}) {
    const deleteSongClick = async () => {
        const songName = prompt(`Do you really want to delete the spex '${song.name}'? (Type the song name to confirm)`)

        if(songName != song.name) return alert("Delete aborted");

        // Delete song
        try {
            await deleteSong(spexID, song);
        } catch(e) {
            alert(e);
            alert("Om det var en permissions-error prova att logga ut och in igen");
            return;
        }

        alert("Song deleted")
        window.location.reload();
    }

    return (
        <div className={style.listItem}>
            <p>{song.name} - {song.edition}</p>
            <div className={style.listIcon}>
                <Link href={`/admin/edit/${spexID}/${song.id}`}><span className={style.edit}>Edit</span></Link>
                <span className={style.delete} onClick={deleteSongClick}>Delete</span>
            </div>
        </div>
    )
}