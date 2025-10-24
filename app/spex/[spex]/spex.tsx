"use client";

import { Group } from "@/app/types";

import styles from './style.module.css';
import { useState } from "react";
import SongBox from "./list";

export default function Spex({spex, spexID}: {spex: Group, spexID: String}) {
    const [hasVT, setVT] = useState(false);
    const [hasHT, setHT] = useState(false);

    let toggleFilter = (filter: String) => {
        if(filter == "VT") setVT(!hasVT);
        else setHT(!hasHT);
    }

    return (
        <div className={styles.main}>
            <div>
                <h1 className={styles.spexTitle}>{spex.name}</h1>
                <p className={styles.subTitle}>{spex.eller}</p>
                <div className={styles.pillBox}>
                    <p className={`${styles.pill} ${hasVT ? styles.selected : ""}`} onClick={() => toggleFilter("VT")}>VT{spex.year}</p>
                    <p className={`${styles.pill} ${hasHT ? styles.selected : ""}`} onClick={() => toggleFilter("HT")}>HT{spex.year}</p>
                </div>
                <br></br>
                <hr></hr>
                <br></br>
            </div>
            <div className={styles.list}>
                {
                spex.songs.filter(song => {
                    if(song.edition == "VT" && hasVT) return true;
                    if(song.edition == "HT" && hasHT) return true;
                    if(!hasVT && !hasHT) return true;
                    return false;
                }).map(
                    song => <SongBox key={song.id} song={song} spexID={spexID} spex={spex}></SongBox>
                )
                }
            </div>
        </div>
    )
}