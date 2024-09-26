import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useContext } from "react";
import { randomUUID } from "expo-crypto";
import { View } from "react-native";
import { Member } from "@/graphql";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

type MembersHistoryContextType = {
    push: (member: Partial<Member>) => any;
    items: Partial<Member>[];
}
const MembersHistoryContext = createContext<MembersHistoryContextType>({
    push: () => null,
    items: []
});

MembersHistoryContext.displayName = "MembersHistoryContext";

type MembersHistoryProviderProps = {

}

export function MembersHistoryProvider({ children }: PropsWithChildren<MembersHistoryProviderProps>) {

    const { getItem, setItem } = useAsyncStorage("@membersHistory");
    const [membersHistory, setMembersHistory] = useState<Partial<Member>[]>([]);

    const getMembersHistory: () => Promise<Partial<Member>[]> = async () => {
        const val = await getItem();
        return val ? JSON.parse(val) : [];
    }

    useEffect(() => {
        const get = async () => {
            const val = await getMembersHistory();
            setMembersHistory(val);
        }

        get();
    }, [])

    return (
        <MembersHistoryContext.Provider value={{
            push: async (member) => {
                const prev = await getMembersHistory();
                setMembersHistory([member, ...prev.filter((item) => item.id !== member.id)].slice(0, 5));
                await setItem(JSON.stringify([member, ...prev.filter((item) => item.id !== member.id)].slice(0, 5)));
            },
            items: membersHistory
        }}
        >
            {children}
        </MembersHistoryContext.Provider>
    )
};

export function useMembersHistory(): [Partial<Member>[], (member: Partial<Member>) => any] {
    const value = useContext(MembersHistoryContext);

    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useMembersHistory must be wrapped in a <MembersHistoryProvider />');
        }
    }
    return [value.items, value.push];
}


export default MembersHistoryProvider