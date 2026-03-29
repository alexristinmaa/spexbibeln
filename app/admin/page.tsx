"use client";

import { useEffect, useState } from "react";
import { getGroups } from "../util"
import ListItem from "./ListItem";
import style from "./style.module.css"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
import Login from "./Login";
import { DBGroup } from "../types";

export default function Admin() {
    const [isAuth, setAuth] = useState("loading");
    const [spex, setSpex] = useState<DBGroup[]>()

    useEffect(() => {
        getGroups().then(setSpex)
    }, [])

    const auth = getAuth(app);
    

    onAuthStateChanged(auth, (user) => {
        setAuth(user != null ? "authenticated" : "notLoggedIn");
    });

    if(isAuth == "loading") {
        return <p>Loading...</p>
    }

    if(isAuth == "notLoggedIn") {
        return <Login ></Login>
    }

    return (
        <div className={style.main}>
            <button onClick={() => auth.signOut()}>Log out</button>
            <div className={style.spexList}>
                {spex?.map(spex => 
                    <ListItem 
                        key={spex.id} 
                        spex={spex}
                    />
                )}
            </div>
        </div>
    )
}