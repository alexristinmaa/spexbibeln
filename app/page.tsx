import styles from "./page.module.css";

import { getGroups } from "./util";
import GroupBox from "./list";
import { Raleway } from "next/font/google";
import Link from "next/link";
import { redirect } from "next/navigation";

const raleway = Raleway({
  weight: "700",
  subsets: ['latin']
});

export default async function Home() {
  const songGroups = await getGroups();

  let goToRandom = () => {
    let songs = songGroups.map(group => group.data.songs.map(song => {
      return {
        song: song.id, 
        spex: group.id
      }
    })).flat();
    
    let song = songs[Math.floor(Math.random()*songs.length)];

    redirect(`spex/${song.spex}/song/${song.song}`);

  }

  return (
    <>
        <div className={styles.finder}>
          {
            songGroups.map(
              group => <GroupBox key={group.id} group={group}></GroupBox>
            )
          }
        </div>
    </>
  );
}
