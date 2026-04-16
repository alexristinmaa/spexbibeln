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

    const refresh = async () => {
        const token = await auth.currentUser?.getIdToken();
        const res = await fetch("/api/redeploy", {
            method: "POST",
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        if(!res.ok) return alert("Error: Failed refresh")

        alert("Website is refreshing, ~1min until change is live")
    };

    return (
        <div className={style.main}>
            <div className={style.topBar}>
            <span className={style.topBarTitle}>Admin Panel</span>
            <div className={style.topBarButtons}>
                <button className={style.commitButton} onClick={(() => refresh())}>
                    Commit changes
                </button>
                <button className={style.signOutButton} onClick={() => auth.signOut()}>
                    Sign out
                </button>
            </div>
            </div>
            <div className={style.spexList}>
            {spex?.map(spex =>
                <ListItem key={spex.id} spex={spex} />
            )}
            </div>
        </div>
    )
}