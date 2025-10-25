"use client";

import {useState} from "react";
import styles from "./page.module.css";
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import { app } from "@/app/firebase";
import Login from "./login";
import { addGroup, addSong, getGroups } from "@/app/util";

export default function Home() {
    const [isAuth, setAuth] = useState("loading");
    const auth = getAuth(app);

    const [spexNames, setSpexNames] = useState([] as {name: string, id: string}[]);

    const [selected, setSelected] = useState("newSpex");
    const [selectedEdition, setSelectedEdition] = useState("VT");
    const [spexName, setSpexName] = useState("");
    const [spexNameEller, setSpexNameEller] = useState("");
    const [spexYear, setSpexYear] = useState("");

    const [songName, setSongName] = useState("");
    const [songMelody, setSongMelody] = useState("");
    const [songLyrics, setSongLyrics] = useState("");

    onAuthStateChanged(auth, (user) => {
        setAuth(user != null ? "authenticated" : "notLoggedIn");
    });

    if(isAuth == "loading") {
        return <p>Loading...</p>
    }

    if(isAuth == "notLoggedIn") {
        return <Login ></Login>
    }

    let logOut = () => {
        signOut(auth);
    }

    let submit = () => {
        if(selected == "newSpex") {
            // Create a new spex, then add the new song

            addGroup(spexName.replaceAll(" ", "-").normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase(), {
                name: spexName,
                year: parseInt(spexYear),
                eller: spexNameEller,
                color: "",
                songs: []
            }).then(() => {
                addSong(spexName.replaceAll(" ", "-").normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase(), {
                    id: songName.replaceAll(" ", "-").normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase(),
                    name: songName,
                    comments: "",
                    lyrics: songLyrics,
                    melody: songMelody,
                    edition: selectedEdition
                });
            });
            return;
        }

        // Just add the song to the selected id

        addSong(selected, {
            id: songName.replaceAll(" ", "-").normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase(),
            name: songName,
            comments: "",
            lyrics: songLyrics,
            melody: songMelody,
            edition: selectedEdition
        });
    }

    getGroups()
        .then(groups => {
            setSpexNames(groups.map(group => {
                return {name: group.data.name, id: group.id}
            }));
        })

    return (
        <main className={styles.main}>
            <button onClick={logOut}>Log out</button>
            <h1>Add a song</h1>
            <div className={styles.form}>
                <div className={styles.pair}>
                    <label htmlFor="spex">Spex: </label>
                    <select name="spex" value={selected} onChange={(e) => setSelected(e.target.value)}>
                        <option value="newSpex">Add new</option>
                        {
                            spexNames.map(group => <option key={group.id} value={group.id}>{group.name}</option>)
                        }
                    </select>
                    <label htmlFor="edition">Edition: </label>
                    <select name="edition" value={selectedEdition} onChange={(e) => setSelectedEdition(e.target.value)}>
                        <option value="VT">VT</option>
                        <option value="HT">HT</option>
                    </select>
                </div>
                {
                    selected == "newSpex" ?
                    <>
                        <div className={styles.pair}>
                            <label htmlFor="newSpexName">Name: </label>
                            <input type="text" name="newSpexName" onChange={(e) => setSpexName(e.target.value)}/>
                        </div>
                        <div className={styles.pair}>
                            <label htmlFor="newSpexName">eller: </label>
                            <input type="text" name="newSpexName" onChange={(e) => setSpexNameEller(e.target.value)}/>
                        </div>
                        <div className={styles.pair}>
                            <label htmlFor="newSpexYear">Year: </label>
                            <input type="number" name="newSpexYear" onChange={(e) => setSpexYear(e.target.value)}/>
                        </div>
                    </>
                    :
                    ""
                }
                <div>
                    <label htmlFor="title">Song name: </label>
                    <input className={styles.songName} type="text" name="title" onChange={(e) => setSongName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="melody">Song melody: </label>
                    <input className={styles.songName} type="text" name="melody" onChange={(e) => setSongMelody(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="lyrics">Song lyrics: </label>
                    <textarea className={styles.lyrics} name="lyrics" onChange={(e) => setSongLyrics(e.target.value)}></textarea>
                </div>
                <div>
                    <button type="submit" onClick={submit}>Submit</button>
                </div>
            </div>

        </main>
    );
}
