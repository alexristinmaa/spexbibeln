"use client";

import { Group, Song } from '@/app/types';
import styles from './style.module.css';
import Link from 'next/link';

export default function Spex({song, spex, spexID}: {song: Song, spex: Group, spexID: String}) {
    return (
        <div className={styles.main}>
            {spex.color != "" ? <meta name="theme-color" content={"#" + spex.color}></meta> : ""}
            <style global jsx>{`
                body {
                    ${spex.color == "" ? "": "--red: #" + spex.color + "!important;"}
                }
            `}</style>
            <p>från <u><Link href={`/spex/${spexID}`}>{spex.name}</Link></u></p>
            <h1>{song.name}</h1>
            {song.melody ? <p className={styles.melody}>Melodi: {song.melody}</p> : ""}
            <p className={styles.lyrics}>{song.lyrics}</p>
        </div>
    );
}