import Link from "next/link";
import styles from "./list.module.css";
import { DBGroup } from "./types";

function GroupBox({group}: {group: DBGroup}) {  
  const groupData = group.data;

  return (
    <Link href={`spex/${group.id}`}>
      <div className={`${styles.group}`}>
      <p className={styles.groupTitle}>{groupData.name}</p>
      <p className={styles.groupInfo}>Spex - {groupData.year}</p>
    </div>
    </Link>
    
  )
}

export default GroupBox;