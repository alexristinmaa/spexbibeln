import { CSSProperties, useState } from "react";

import styles from "./EditableField.module.css"
import { ClickableConfirmIcon, ClickableEditIcon, ClickableExitIcon } from "./ClickableIcon";

export default function EditableColor(
    {initialValue, onSubmit, style}: 
    {initialValue: string, onSubmit: (_: string) => void, style?: CSSProperties}
) {
    const [editable, setEditable] = useState<boolean>(false);
    const [value, setValue] = useState<string>(initialValue);

    const confirmChange = () => {
        toggleEdit()
        if(value) onSubmit(value.slice(1))
    }

    const exitChange = () => {
        toggleEdit()
        setValue(initialValue)
    }

    const toggleEdit = () => setEditable(!editable)
    
    return (
        <div className={styles.row}>
            <input style={style} type="color" disabled={!editable} value={value} onChange={(e) => setValue(e.target.value)}/>
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