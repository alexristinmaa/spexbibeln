"use client";

import { Group, Song } from "@/app/types";

import styles from "../style.module.css";
import EditableField from "../../EditableField";
import EditableTextarea from "../../EditableTextarea";
import { updateSong } from "@/app/util";
import { useState } from "react";

export default function EditableSong({spexID, spex, song} : {spexID: string, spex: Group, song: Song}) {
    const [loading, setLoading] = useState(false)


    const submitEdit = async (changes: Partial<Song>) => {
        setLoading(true);

        let err = null;

        try {
            await updateSong(spexID, {
                ...changes,
                ...{
                    id: song.id,
                    edition: song.edition
                }
            })
        } catch(e) {
            err = e;
            alert(e)
            alert("Om det var en permissions-error, prova att logga in igen.")
        } finally {
            if(!err) alert("Song was successfully updated");

            setLoading(false);
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.loading} style={{visibility: loading ? "visible" : "hidden"}}></div>
            <h2><b>Editing:</b> <i>{song.name}</i> from {spex.name}</h2><br />
            <div className={styles.rows}>
                <div className={styles.row}>
                    <label>Name: </label>
                    <EditableField initialValue={song.name} onSubmit={(s) => submitEdit({name: s})}></EditableField>
                </div>
                <div className={styles.row}>
                    <label>Melody: </label>
                    <EditableField initialValue={song.melody} onSubmit={(s) => submitEdit({melody: s})}></EditableField>
                </div>
                <div className={styles.row}>
                    <label>Lyrics: </label>
                    <EditableTextarea initialValue={song.lyrics} onSubmit={(s) => submitEdit({lyrics: s})}></EditableTextarea>
                </div>
            </div>
        </div>
    )
}