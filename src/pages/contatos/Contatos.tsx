import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useContacts } from "./api/useContacts";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/PageLayout";

const breadcrumb = [
    {
        title: "Gerenciamento",
        url: ""
    },
    {
        title: "Conversas",
        url: ""
    }
]

function formatPhoneNumber(rawNumber: string): string {
    const cleanedNumber = rawNumber?.replace('@c.us', '');

    // if (cleanedNumber.length !== 13) {
    //     throw new Error("Número inválido. O número deve conter 13 dígitos.");
    // }

    const countryCode = cleanedNumber?.slice(0, 2);
    const areaCode = cleanedNumber?.slice(2, 4);
    const firstPart = cleanedNumber?.slice(4, 8);
    const secondPart = cleanedNumber?.slice(8);

    return `+${countryCode} ${areaCode} 9${firstPart}-${secondPart}`;
}

function capitalizeName(name: string) {
    return name
        ?.toLowerCase()
        ?.split(' ')
        ?.map(word => word.charAt(0).toUpperCase() + word.slice(1))
        ?.join(' ');
}


export function Contacts() {

    const { contacts, reload } = useContacts()

    return (
        <>
            <PageLayout breadcrumb={breadcrumb}>
                <h1>Contatos</h1>
                <div className="flex flex-col gap-4">
                    {
                        contacts.map((c, index) => {
                            return (
                                <Link to={`/messages/${c.id}`}>
                                    <Card key={index} className="p-4 flex justify-between items-center cursor-pointer">
                                        <div className="flex gap-2 flex-col w-full cursor-pointer ">
                                            <div className="flex justify-between">
                                                <div className="flex flex-col gap-3">
                                                    <Label className="cursor-pointer">Nome: {capitalizeName(c?.name)}</Label>
                                                    <Label className="cursor-pointer">Telefone: {formatPhoneNumber(c?.phone)}</Label>
                                                </div>
                                                <div>
                                                    <Label className="text-gray-400 cursor-pointer">
                                                        Inicio em: {new Date(c?.created_at).toLocaleDateString()} às {new Date(c?.created_at).toLocaleTimeString().slice(0, 5)}
                                                    </Label>
                                                </div>
                                            </div>


                                            <Label className="flex gap-2 items-center justify-between cursor-pointer">
                                                Atendido por:
                                                <Badge>{c?.attendant}</Badge>
                                            </Label>
                                            <Label className="flex gap-2 items-center justify-between cursor-pointer">
                                                Status:
                                                <Badge>{c?.status}</Badge>
                                            </Label>
                                        </div>
                                    </Card>
                                </Link>
                            );
                        })
                    }
                </div>
            </PageLayout>
        </>
    );
}