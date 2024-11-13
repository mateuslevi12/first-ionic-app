import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { BrainCircuit, CircleUserRound } from "lucide-react";

interface Props {
    message: {
        role: string;
        content: string;
        name: string;
        createdAt: Date;
    };
}

function initialLetters(name: string) {
    return name
        ?.split(' ')
        ?.map(word => word[0])
        ?.join('')
        ?.toUpperCase()
}    


export function Message({ message }: Props) {
    const isAssistant = message.role === "AI";

    return (
        <div
            className={`flex gap-2 w-full items-start ${isAssistant ? "justify-end" : "justify-start"}`}
        >
            {!isAssistant && (
                <div className="flex gap-2 flex-col">
                    <Avatar>
                        <AvatarFallback>{initialLetters(message.name)}</AvatarFallback>
                    </Avatar>
                    {/* <Label className="text-gray-900 dark:text-white">{message.createdAt}</Label> */}
                </div>
            )}
            <Card className={`p-3 rounded-md shadow-md max-w-xl ${isAssistant ? "text-right" : "text-left"}`}>
                <Label className="text-gray-900 dark:text-white">
                    {message.content}
                </Label>
            </Card>
            {isAssistant && (
                <div className="flex gap-2 flex-col">
                    <BrainCircuit className="text-blue-500" />
                    {/* <Label className="text-gray-900 dark:text-white">{message.createdAt}</Label> */}
                </div>
            )}
        </div>
    );
}
