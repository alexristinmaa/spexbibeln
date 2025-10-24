import { getGroup, getGroups } from "@/app/util"

import styles from './style.module.css';
import Link from "next/link";

export async function generateStaticParams() {
  const groups = await getGroups();

  const songs = groups.map(group => group.data.songs.map(song => ({spex: group.id, song: song.id}))).flat();
 
  console.log(songs)

  return songs.map((song) => ({
    spex: song.spex,
    song: song.song
  }))
}


// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({ params }: {params: Promise<{spex: string, song: string}>}) {
  const { spex, song } = await params;

  const spexData = (await getGroup(spex))!;

  const songData = spexData?.songs.find((s) => s.id == song)!;

  return (
    <div className={styles.main}>
        <p>från <u><Link href={`/spex/${spex}`}>{spexData.name}</Link></u></p>
        <h1>{songData.name}</h1>
        <p className={styles.melody}>Melodi: {songData.melody}</p>
        <p className={styles.lyrics}>{songData.lyrics}</p>
    </div>
  )
}