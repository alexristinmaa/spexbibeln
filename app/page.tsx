import styles from "./page.module.css";

import { getGroups } from "./util";
import GroupBox from "./list";
import Blocks from "./blocks";

export default async function Home() {
  const songGroups = await getGroups();

  return (
    <>
      <Blocks groups={songGroups}/>
      <div className={styles.finder}>
        {
          songGroups.sort((a,b) => b.data.year - a.data.year).map(
            group => <GroupBox key={group.id} group={group}></GroupBox>
          )
        }
      </div>
    </>
  );
}
