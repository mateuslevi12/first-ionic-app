import { api } from "@/api";
import { useEffect, useState } from "react";

type TMessage = {
    contact: any,
    messages: {
        id: string;
        sender: string;
        message: string;
        created_at: Date;
        contactId: string;
    }[]
   
}

export function useMessages({
    idContact
}: {
    idContact?: string; 
}) {
    const [messages, setMessages] = useState<TMessage>();

    useEffect(() => {
        reload();
    }, []);

    const reload = async () => {
        const data = await listMessages(idContact);
        setMessages(data);
    };

    return {
        messages,
        reload,
    };
}

async function listMessages(idContact?: string): Promise<TMessage> {
    const { data } = await api.get(`/chats/messages/${idContact}`);
    return data.data.messages;
}