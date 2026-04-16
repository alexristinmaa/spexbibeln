"use client";

import { DBGroup, Group } from "@/app/types";

import styles from "./style.module.css"
import EditableField from "../EditableField";
import EditableColor from "../EditableColor";
import ListItem from "./ListItem";
import { getGroup, updateGroup } from "@/app/util";
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
                <h3>Songs:</h3>
                <br />
                <div className={styles.rows}>
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