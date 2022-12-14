import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import firestoreDb from "../firebase-config";

function BuzzListScreen({ render, roomId, userId }) {
    const [buzzes, setBuzzes] = useState([]);
    const [isEnabled, setEnabled] = useState(true);

    useEffect(() => {
        const buzzDoc = collection(firestoreDb, "buzzes");
        const whereClause = where("roomId", "==", roomId);
        const order = orderBy("ts");
        const buzzQuery = query(buzzDoc, whereClause, order);
        const queryCallback = (buzz) => {
            const mappedBuzzes = [];
            let shouldBeEnabled = true;
            buzz.docs.forEach((buzzesDoc) => {
                const data = buzzesDoc.data();
                const ts = data.ts ? new Date(data.ts.toMillis()).toLocaleString() : "";
                mappedBuzzes.push({
                    "id": buzzesDoc.id,
                    "userName": data.userName,
                    "ts": ts
                });
                if (data.userId === userId) {
                    shouldBeEnabled = false;
                }
            });
            setEnabled(shouldBeEnabled);
            setBuzzes(mappedBuzzes);
        };
        const unsub = onSnapshot(buzzQuery, queryCallback);

        return () => {
            unsub();
        };
    }, [roomId, userId]);

    return render({ buzzes, isEnabled, setBuzzes });
}

export default BuzzListScreen;