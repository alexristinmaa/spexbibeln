"use client";

import { Group } from "@/app/types";

import styles from "./style.module.css"
import EditableField from "../EditableField";
import EditableColor from "../EditableColor";
import ListItem from "./ListItem";
import { updateGroup } from "@/app/util";
import { useState } from "react";

export default function EditableSpex({spex, spexID}: {spex: Group, spexID: string}) {
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
            if(!err) alert("Spex was successfully updated");

            setLoading(false);
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.loading} style={{visibility: loading ? "visible" : "hidden"}}></div>
            <h2><b>Editing:</b> <i>{spex.name}</i></h2><br />
            <div className={styles.rows}>
                <div className={styles.row}>
                    <label htmlFor="color">Color: </label>
                    <EditableColor initialValue={`#${spex.color}`} onSubmit={(s) => submitEdit({color: s})}></EditableColor>
                </div>
                <div className={styles.row}>
                    <label>Name: </label>
                    <EditableField initialValue={spex.name} onSubmit={(s) => submitEdit({name: s})}></EditableField>
                </div>
                <div className={styles.row}>
                    <label>Eller: </label>
                    <EditableField initialValue={spex.eller} onSubmit={(s) => submitEdit({eller: s})}></EditableField>
                </div>
                <div>
                    <h3>Songs:</h3>
                    <br />
                    <div className={styles.rows}>
                        {spex.songs.map(song => (
                            <ListItem key={song.id + song.edition} spexID={spexID} song={song} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}