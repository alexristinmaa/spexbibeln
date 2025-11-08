'use client';

import Link from 'next/link';
import styles from './page.module.css';

import { Raleway } from "next/font/google";
import { DBGroup, Group } from './types';
import { redirect } from 'next/navigation';

const raleway = Raleway({
  weight: "700",
  subsets: ['latin']
});

function Blocks({groups}: {groups: DBGroup[]}) {
    let goToRandom = () => {
        let songs = groups.map(group => group.data.songs.map(song => {
        return {
            song: song.id, 
            spex: group.id
        }
        })).flat();
        
        let song = songs[Math.floor(Math.random()*songs.length)];

        redirect(`spex/${song.spex}/${song.song}`);
    }
    
    return (
        <div className={`${styles.blocks} ${raleway.className}`}>
            <div>FAVORITER</div>
            <div onClick={goToRandom}>RANDOM</div>
            <Link href='/spex/ovriga'><div>EXTRA</div></Link>
        </div>
    )
}

export default Blocks;