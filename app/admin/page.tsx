"use client";

import { useEffect, useState } from "react";
import { addGroup, getGroups, normalizeName } from "../util"
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

        onAuthStateChanged(auth, (user) => {
            setAuth(user != null ? "authenticated" : "notLoggedIn");
        });
    }, [])

    

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

    const addSpex = async () => {
        const name = prompt("Enter spex name here:");

        if(!name) return;

        try {
            await addGroup(normalizeName(name), {
                name: name,
                year: new Date().getFullYear(),
                eller: "",
                color: "ffffff",
                songs: []
            });
        } catch(e) {
            alert(e);
            alert("Om det var en permissions-error prova att logga ut och in igen");
            return;
        }

        alert("Spex added, to be able to add to the spex - update the website with your changes")

        window.location.reload();
    }

    return (
        <div className={style.main}>
            <div className={style.topBar}>
            <span className={style.topBarTitle}>Admin Panel</span>
            <div className={style.topBarButtons}>
                <button className={style.commitButton} onClick={(() => refresh())}>
                    Update website with changes
                </button>
                <button className={style.signOutButton} onClick={() => auth.signOut()}>
                    Sign out
                </button>
            </div>
            </div>
            <div className={style.spexList}>
                <div className={style.listItem}>
                    <h4>New spex</h4>

                    <div className={style.listIcon}>
                        <span className={style.add} onClick={addSpex}>Add</span>
                    </div>
                </div>
                {spex?.map(spex =>
                    <ListItem key={spex.id} spex={spex} />
                )}
            </div>
        </div>
    )
}