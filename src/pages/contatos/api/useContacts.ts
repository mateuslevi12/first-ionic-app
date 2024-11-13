import { api } from "@/api";
import { useEffect, useState } from "react";


export type Status = "WAITING" | "ACTIVE" | "FINISHED";
export type Attendant = "AI" | "HUMAN";

interface Contacts {
    id: string
    name: string;
    phone: string; 
    created_at: string; 
    status: Status;
    attendant: Attendant;
}

export function useContacts() {
    const [contacts, setContacts] = useState<Contacts[]>([]);

    useEffect(() => {
        reload();
    }, []);

    const reload = async () => {
        const data = await listContacts();
        setContacts(data);
    };

    return {
        contacts,
        reload, 
    };
}

async function listContacts(): Promise<Contacts[]> {
    const { data } = await api.get(`/chats`);
    return data.data.chats;
}

export async function changeAttendent(id: string, attendant: string) {
    const { data } = await api.put(`/chats/${id}/changeAttendent`, {
        attendant
    });
    return data.data.chat;
}

