import React, { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useContext } from "react";
import { randomUUID } from "expo-crypto";
import { View } from "react-native";
import { Member } from "@/appsync/API";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

type SetMembersHistoryFn = (member: Member) => void
type UseMembersHistoryHook = [Member[], SetMembersHistoryFn];

type MembersHistoryContextType = {
    push: SetMembersHistoryFn
    item: Member[]
}
const MembersHistoryContext = createContext<MembersHistoryContextType>({
    push: () => null,
    item: []
});

MembersHistoryContext.displayName = "MembersHistoryContext";

export function MembersHistoryProvider({ children }: PropsWithChildren) {

    const { getItem, setItem } = useAsyncStorage('@membersHistory');
    const [membersHistory, setMembersHistory] = useState<Member[]>([]);

    useEffect(() => {
        const get = async () => {
            const value = await getItem();
            if (value) {
                setMembersHistory(JSON.parse(value))
            }
        }

        get();
    }, [])

    const push = (value: Member) => {
        const newValue = [value, ...membersHistory.filter((member) => member.id !== value.id).slice(0, 5)];
        setMembersHistory(prev => [value, ...prev].filter((member) => member.id !== value.id).slice(0, 5));
        setItem(JSON.stringify(newValue));
    }

    return (
        <MembersHistoryContext.Provider value={{
            push,
            item: membersHistory
        }}
        >
            {children}
        </MembersHistoryContext.Provider>
    )
};

export function useMembersHistory(): UseMembersHistoryHook {
    const value = useContext(MembersHistoryContext);

    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useMembersHistory must be wrapped in a <MembersHistoryProvider />');
        }
    }
    return [value.item, value.push];
}


export default MembersHistoryProvider