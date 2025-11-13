"use client";

import { Group } from "@/app/types";

import styles from './style.module.css';
import { useState } from "react";
import SongBox from "./list";

export default function Spex({spex, spexID}: {spex: Group, spexID: String}) {
    const hasAnyHT = spex.songs.filter(song => song.edition == "HT").length > 0 && !Number.isNaN(spex.year);
    const hasAnyVT = spex.songs.filter(song => song.edition == "VT").length > 0 && !Number.isNaN(spex.year);

    const [hasVT, setVT] = useState(hasAnyVT);

    let toggleFilter = () => {
        setVT(!hasVT);
    }

    return (
        <div className={styles.main}>
            {spex.color != "" ? <meta name="theme-color" content={"#" + spex.color}></meta> : ""}
            <style global jsx>{`
                body {
                    ${spex.color == "" ? "": "--red: #" + spex.color + "!important;"}
                }
            `}</style>
            <div>
                <h1 className={styles.spexTitle}>{spex.name}</h1>
                <p className={styles.subTitle}>{spex.eller}</p>
                <div className={styles.pillBox}>
                    {
                        hasAnyVT ?
                            <p className={`${styles.pill} ${hasVT ? styles.selected : ""}`} onClick={() => toggleFilter()}>VT{spex.year}</p>
                        :
                        ""
                    }
                    {
                        hasAnyHT ?
                            <p className={`${styles.pill} ${!hasVT ? styles.selected : ""}`} onClick={() => toggleFilter()}>HT{spex.year}</p>
                        :
                        ""
                    }
                </div>
                <br></br>
                <hr></hr>
                <br></br>
            </div>
            <div className={styles.list}>
                {
                spex.songs.filter(song => {
                    if(song.edition == "VT" && hasVT) return true;
                    if(song.edition == "HT" && !hasVT) return true;
                    return false;
                }).map(
                    song => <SongBox key={song.id + song.edition} song={song} spexID={spexID} spex={spex}></SongBox>
                )
                }
            </div>
        </div>
    )
}