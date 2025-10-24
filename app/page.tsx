import styles from "./page.module.css";

import { getGroups } from "./util";
import GroupBox from "./list";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  weight: "700",
  subsets: ['latin']
});

export default async function Home() {
  const songGroups = await getGroups();

  return (
    <>
      <div className={`${styles.blocks} ${raleway.className}`}>
        <div>FAVORITER</div>
        <div>RANDOM</div>
        <div>EXTRA</div>
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
