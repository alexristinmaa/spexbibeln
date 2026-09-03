"use client";

import { DBGroup, Group } from "@/app/types";

import styles from "./style.module.css"
import EditableField from "../EditableField";
import EditableColor from "../EditableColor";
import ListItem from "./ListItem";
import { addSong, getGroup, normalizeName, updateGroup } from "@/app/util";
import { use, useEffect, useState } from "react";

export default function EditableSpex({ spex, spexID }: { spex: Group, spexID: string }) {
    const [spexData, setSpexData] = useState<Group>(spex);
    const [loading, setLoading] = useState(false)

    const submitEdit = async (changes: Partial<Group>) => {
        setLoading(true);

        let err = null;

        try {
            updateGroup(spexID, changes)
        } catch(e) {
            err = e;
            alert(e)
            alert("Om det var en permissions-error, prova att logga in igen.")
        } finally {
            if(!err) {
                getGroup(spexID).then(data => {
                    if(!data) return;

                    setSpexData(data)
                    alert("Spex was successfully updated");
                    setLoading(false);
                })
            }
        }
    }

    useEffect(() => {
        getGroup(spexID).then(data => data && setSpexData(data))
    }, [])

    const addSongClick = async () => {
        const name = prompt("Enter song name here:");

        if(!name) return;

        try {
            await addSong(spexID, {
                id: normalizeName(name),
                name: name,
                comments: "",
                lyrics: "",
                melody: "",
                edition: ""
            });
        } catch(e) {
            alert(e);
            alert("Om det var en permissions error, prova att logga ut och in igen.")
            return;
        }

        alert("Song created, to add lyrics and more, update the website with your changes (button on main admin page)")
        window.location.reload();
    }

    return (
        <div className={styles.main}>
            <div className={styles.loading} style={{visibility: loading ? "visible" : "hidden"}}></div>
            {spexData && 
            <>
            <h2><b>Editing:</b> <i>{spexData.name}</i></h2><br />
            <div className={styles.rows}>
                <EditableColor label="Color" initialValue={`#${spexData.color}`} onSubmit={(s) => submitEdit({color: s})}></EditableColor>
                <EditableField label="Name" initialValue={spexData.name} onSubmit={(s) => submitEdit({name: s})}></EditableField>
                <EditableField label="Eller" initialValue={spexData.eller} onSubmit={(s) => submitEdit({eller: s})}></EditableField>
                <EditableField label="Year" initialValue={spexData.year.toString()} onSubmit={(s) => submitEdit({year: (parseInt(s) || 0)})}></EditableField>
                <h3>Songs:</h3>
                <br />
                <div className={styles.rows}>
                    <div className={styles.listItem}>
                        <p>New song</p>
                        <div className={styles.listIcon}>
                            <span className={styles.add} onClick={addSongClick}>Add</span>
                        </div>
                    </div>
                    {spexData.songs.map(song => (
                        <ListItem key={song.id + song.edition} spexID={spexID} song={song} />
                    ))}
                </div>
            </div>
            </>
            }

        </div>
    )
}