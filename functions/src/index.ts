import {initializeApp} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";
import {logger, setGlobalOptions} from "firebase-functions";
import {onCall} from "firebase-functions/https";

initializeApp();

const auth = getAuth();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({maxInstances: 5});

export const redeploy = onCall({secrets: ["GITHUB_PAT"]}, async (request) => {
    logger.log("Trying to redeploy.");

    //console.log(request);

    const token = request.auth?.rawToken;

    if (!token) return {error: "Unauthorized", status: 401};

    try {
        await auth.verifyIdToken(token);
    } catch {
        return {error: "Unauthorized", status: 401};
    }

    // Token valid — trigger redeploy
    const res = await fetch(
        "https://api.github.com/repos/alexristinmaa/spexbibeln/dispatches",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_PAT}`,
                Accept: "application/vnd.github+json",
            },
            body: JSON.stringify({event_type: "redeploy"}),
        }
    );

    if (!res.ok) {
        return {error: JSON.stringify(await res.json()), status: 500};
    }

    logger.log("Redeply successful.");

    return {error: "", status: 200};
});
