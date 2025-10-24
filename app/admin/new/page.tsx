"use client";

import {useState} from "react";
import styles from "./page.module.css";

export default function Home() {
    const [selected, setSelected] = useState("newSpex");

    return (
        <main className={styles.main}>
            <h1>Add a song</h1>
            <div>
                <div>
                    <label htmlFor="spex">Spex: </label>
                    <select name="spex" value={selected} onChange={(e) => setSelected(e.target.value)}>
                        <option value="newSpex">Add new</option>
                        <option value="name">Spex1</option>
                        <option value="name">Spex2</option>
                    </select>
                    {
                        selected == "newSpex" ?
                        <>
                            <label htmlFor="newSpexName">Name:</label>
                            <input type="text" name="newSpexName"/>
                            <label htmlFor="newSpexYear">Year:</label>
                            <input type="number" name="newSpexYear"/>
                        </>
                        :
                        ""
                    }
                </div>
                <div>
                    <label htmlFor="title">Song name: </label>
                    <input type="text" name="title"/>
                </div>
                <div>
                    <label htmlFor="lyrics">Song lyrics: </label>
                    <textarea name="lyrics"></textarea>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </div>
            
        </main>
    );
}
