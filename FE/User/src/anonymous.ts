import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useRouter } from "next-intl/client";
import Cookies from "js-cookie";
export default function useAnonymousSocket() {
    const router = useRouter();
    const [socket, setSocket] = useState<any>();
    const backend_api = `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}`
    useEffect(() => {
        const storedValue = Cookies.get('socketId');
        const newSocket = io(backend_api, {
            query: { customId: storedValue },
        });

        newSocket.on("connect", () => {

            if (!storedValue){
                const id: any = newSocket.id;
                const expires = new Date();
                expires.setHours(expires.getHours() + 24);
                Cookies.set('socketId', id, { expires });
            };
            console.log("Connected");
        });

        newSocket.on("disconnect", () => {
            console.log("Disconnected");
        });

        newSocket.on("connect_error", async (err) => {
            console.log(`connect_error due to ${err.message}`);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [router]);

    return socket;
}
