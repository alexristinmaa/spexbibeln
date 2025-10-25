import { app } from "@/app/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { useState } from "react";


export default function Login() {
    const auth = getAuth(app);
    const router = useRouter();

    const [status, setStatus] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        console.log(email)

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                router.push("/admin/new")
            })
            .catch(error => {
                setStatus(status + JSON.stringify(error));
            })
            
    }
    
    return (
        <div>
            <p>Log in to administrate the application</p><br></br>
            <label htmlFor="email">Email: </label>
            <input id="email" name="email" type="text" onChange={(e) => setEmail(e.target.value)}/><br></br>
            <label htmlFor="password">Password: </label>
            <input id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)}/><br></br>
            <button onClick={login}>Log in</button>
            <p>{status}</p>
        </div>
    )
}