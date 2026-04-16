"use client";

import { CSSProperties, useState } from "react";
import { ClickableConfirmIcon, ClickableEditIcon, ClickableExitIcon } from "./ClickableIcon";

import styles from "./EditableField.module.css"

export default function EditableField(
  {initialValue, onSubmit, label, style}: 
  {initialValue: string, onSubmit: (_: string) => void, label?: string, style?: CSSProperties}
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
        <div className={styles.fieldWrapper}>
            {label && <label className={styles.label}>{label}</label>}
            <div className={styles.row}>
                <input style={style} className={styles.field} type="text" disabled={!editable} value={value} onChange={(e) => setValue(e.target.value)}/>
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