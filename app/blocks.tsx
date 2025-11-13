'use client';

import Link from 'next/link';
import styles from './page.module.css';

import { Raleway } from "next/font/google";
import { DBGroup, Group } from './types';
import { redirect } from 'next/navigation';

import {messages} from './favoriterDialog';
import { useState } from 'react';

const raleway = Raleway({
  weight: "700",
  subsets: ['latin']
});

function Blocks({groups}: {groups: DBGroup[]}) { 
    const [messageIndex, setMessageIndex] = useState(0);

    let alertMessage = () => {
        alert(messages[messageIndex]);


        setMessageIndex(Math.min((messageIndex + 1), messages.length - 1));
    }

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
            <div onClick={alertMessage}>FAVORITER</div>
            <div onClick={goToRandom}>RANDOM</div>
            <Link href='/spex/ovriga'><div>EXTRA</div></Link>
        </div>
    )
}

export default Blocks;