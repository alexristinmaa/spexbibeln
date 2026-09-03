"use client";

import Link from "next/link";
import { DBGroup } from "../types"
import style from "./style.module.css"
import { deleteGroup } from "../util";

export default function ListItem({spex} : {spex: DBGroup}) {
    const deleteSpex = async () => {
        const spexName = prompt(`Do you really want to delete the spex '${spex.data.name}'? (Type the spex name to confirm)`)

        if(spexName != spex.data.name) return alert("Delete aborted");

        // Delete spex
        try {
            await deleteGroup(spex.id);
        } catch(e) {
            alert(e);
            alert("Om det var en permissions-error prova att logga ut och in igen");
            return;
        }

        alert("Spex has been deleted, this is final. Update the website with the changes to remove from the site.")
   
        window.location.reload();
    }

    return (
        <div className={style.listItem}>
            <div>
                <h4>{spex.data.name}</h4>
                <p>{spex.data.songs.length} låtar</p>
            </div>
            <div className={style.listIcon}>
                <Link href={`/admin/edit/${spex.id}`}><span className={style.edit}>Edit</span></Link>
                <span className={style.delete} onClick={deleteSpex}>Delete</span>
            </div>
        </div>
    )
}