import { Club } from "@/appsync/API";

export const extractClubDataFromPayload: (payload: any) => Club = (payload: any) => {
    return Object.keys(payload).filter((key) => key.startsWith("club:")).reduce<any>((acc, key) => {
        const clubKey = key.replace("club:", "");
        return {
            ...acc,
            [clubKey]: payload[key]
        }
    }, {})
}