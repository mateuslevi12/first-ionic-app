import { useEffect, useRef } from "react";
import { Message } from "./components/Message";
import { useMessages } from "./api/messages";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const breadcrumb = [
    {
        title: "Gerenciamento",
        url: ""
    },
    {
        title: "Conversas",
        url: "/"
    },
    {
        title: "Cliente",
        url: ""
    },
];

export function Chat() {
    const { idContact } = useParams();
    const { messages, reload } = useMessages({ idContact });

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3000');

        socket.onopen = () => {
            console.log('Conexão WebSocket aberta');
        };

        socket.onmessage = () => {
            console.log('Nova mensagem do servidor');
            reload()
        };

        socket.onclose = () => {
            console.log('Conexão WebSocket fechada');
        };

        return () => {
            socket.close();
        };
    }, []);
    
    return (
        <>
            <PageLayout breadcrumb={breadcrumb}>
                <div className="flex gap-2 flex-col justify-between">
                    <div className="flex gap-2 items-center justify-between">
                        <Label>Cliente: {messages?.contact?.name}</Label>
                        <Button>
                            <Label>Inteceptar</Label>
                        </Button>
                    </div>
                    <div className="flex flex-col gap-4 max-h-[70vh] min-h-[70vh] overflow-y-auto p-4 rounded-lg">
                        {
                            messages?.messages.map((message, index) => (
                                <Message
                                    key={index}
                                    message={{
                                        role: message.sender,
                                        content: message.message,
                                        name: messages?.contact?.name,
                                        createdAt: message.created_at
                                    }}
                                />
                            ))
                        }
                        {/* Elemento para rolar até o fim */}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="flex gap-2 w-full">
                        <Input placeholder="Enviar mensagem..." />
                        <Button>
                            <Label>Enviar</Label>
                        </Button>
                    </div>
                </div>
            </PageLayout>
        </>
    );
}
