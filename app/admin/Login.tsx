"use client";
import { app } from "@/app/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import style from "./style.module.css"

export default function Login() {
  const auth = getAuth(app);
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .catch(error => {
        setStatus("Invalid email or password.");
        setLoading(false);
      });
  }

  return (
    <div className={style.loginWrapper}>
      <div className={style.loginCard}>
        <div className={style.loginHeader}>
          <div className={style.loginLogo}>⚙</div>
          <h1 className={style.loginTitle}>Admin Panel</h1>
          <p className={style.loginSubtitle}>Sign in to continue</p>
        </div>

        <div className={style.loginFields}>
          <div className={style.fieldGroup}>
            <label className={style.fieldLabel} htmlFor="email">Email</label>
            <input
              className={style.fieldInput}
              id="email"
              name="email"
              type="text"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={style.fieldGroup}>
            <label className={style.fieldLabel} htmlFor="password">Password</label>
            <input
              className={style.fieldInput}
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {status && <p className={style.loginError}>{status}</p>}

          <button
            className={style.loginButton}
            onClick={login}
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  )
}