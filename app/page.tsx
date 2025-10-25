import styles from "./page.module.css";

import { getGroups } from "./util";
import GroupBox from "./list";
import { Raleway } from "next/font/google";
import Link from "next/link";

const raleway = Raleway({
  weight: "700",
  subsets: ['latin']
});

export default async function Home() {
  const songGroups = await getGroups();

  return (
    <>
      <div className={`${styles.blocks} ${raleway.className}`}>
        <div>RANDOM</div>
        <Link href="/spex/ovrigt"><div>EXTRA</div></Link>
      </div>
        <div className={styles.finder}>
          <div className={styles.search}>
            <input type="text" placeholder="Sök spex, visa eller årtal..."/>
          </div>
          {
            songGroups.map(
              group => <GroupBox key={group.id} group={group}></GroupBox>
            )
          }
        </div>
    </>
  );
}
