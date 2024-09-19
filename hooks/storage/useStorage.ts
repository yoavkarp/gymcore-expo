import { useAsyncStorage } from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react";

type UseStorageHook<T = string> = {
    item: T | null,
    setItem: (value: T) => Promise<void>,
    loading: boolean,
    error: Error | null
}

export const useStorage = <T = string>(key: string, getItemAs: (value: string) => T, setItemAs: (value: T) => string) => {
    const { getItem: getItemFromStorage, setItem: setItemInStorage } = useAsyncStorage(key);
    const [item, setItem] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const get = async () => {
            try {
                const value = await getItemFromStorage();
                setItem(value ? getItemAs(value) : null);
                setLoading(false);
            } catch (error: any) {
                setError(error);
            }
        }

        get();
    }, [])

    const set = async (value: T) => {
        setItem(value);
        await setItemInStorage(setItemAs(value))
    }

    return {
        item,
        error,
        loading,
        setItem: set
    } satisfies UseStorageHook<T>
}