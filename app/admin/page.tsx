"use client";

import { useEffect, useState } from "react";
import { getGroups } from "../util"
import ListItem from "./ListItem";
import style from "./style.module.css"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
import Login from "./Login";
import { DBGroup } from "../types";
import { httpsCallable, getFunctions, HttpsCallableResult, connectFunctionsEmulator } from "firebase/functions";

const auth = getAuth(app);
const functions = getFunctions(app);
const redeploy = httpsCallable(functions, "redeploy");

export default function Admin() {
    const [isAuth, setAuth] = useState("loading");
    const [spex, setSpex] = useState<DBGroup[]>()

    useEffect(() => {
        getGroups().then(setSpex)
    }, [])

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
        const res = await redeploy() as HttpsCallableResult<{error: string, status: number}>;

        if(res.data.status != 200) {
            alert("Website refresh failed: " + res.data.error);
            return;
        }

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