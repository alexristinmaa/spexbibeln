"use client";

import { CSSProperties, useState } from "react";
import { ClickableConfirmIcon, ClickableEditIcon, ClickableExitIcon } from "./ClickableIcon";

import styles from "./EditableField.module.css"

export default function EditableTextarea(
  {initialValue, onSubmit, label, style}: 
  {initialValue: string, onSubmit: (_: string) => void, label?: string, style?: CSSProperties}
)  {
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
        <div className={styles.fieldWrapper}>
            {label && <label className={styles.label}>{label}</label>}
            <div className={styles.row}>
                <textarea style={style} className={styles.field} disabled={!editable} value={value} onChange={(e) => setValue(e.target.value)}/>
                {editable ? (
                <div className={styles.doubleIcon}>
                    <ClickableExitIcon onClick={exitChange}/>
                    <ClickableConfirmIcon onClick={confirmChange}/>
                </div>
                ) : (
                <ClickableEditIcon onClick={toggleEdit}/>
                )}
            </div>
        </div>
    )
}