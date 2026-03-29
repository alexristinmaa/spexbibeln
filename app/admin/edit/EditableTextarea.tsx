"use client";

import { CSSProperties, useState } from "react";
import { ClickableConfirmIcon, ClickableEditIcon, ClickableExitIcon } from "./ClickableIcon";

import styles from "./EditableField.module.css"

export default function EditableField(
    {initialValue, onSubmit, style}: 
    {initialValue: string, onSubmit: (_: string) => void, style?: CSSProperties}
) {
    const [editable, setEditable] = useState<boolean>(false);
    const [value, setValue] = useState<string>(initialValue);

    const confirmChange = () => {
        toggleEdit()
        if(value) onSubmit(value)
    }

    const exitChange = () => {
        toggleEdit()
        setValue(initialValue)
    }

    const toggleEdit = () => setEditable(!editable)
    
    return (
        <div className={styles.row}>
            <textarea style={style} className={styles.field} disabled={!editable} value={value} onChange={(e) => setValue(e.target.value)}/>
            {
                editable ?
                    <div className={styles.doubleIcon}>
                        <ClickableExitIcon    onClick={exitChange}/>
                        <ClickableConfirmIcon onClick={confirmChange}/>
                    </div>
                :
                    <ClickableEditIcon onClick={toggleEdit}/>
            }
        </div>
    )
}