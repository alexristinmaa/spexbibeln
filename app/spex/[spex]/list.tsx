import Link from "next/link";
import styles from "./list.module.css";
import { Group, Song } from "@/app/types";

function SongBox({song, spex, spexID}: {song: Song, spex: Group, spexID: String}) {  
  return (
    <Link href={`/spex/${spexID}/${song.id}`}>
      <div className={`${styles.group}`}>
        <p className={styles.groupTitle}>{song.name}</p>
        <p className={styles.groupInfo}>{song.edition} - {song.melody}</p>
      </div>
    </Link>
  )
}

export default SongBox;