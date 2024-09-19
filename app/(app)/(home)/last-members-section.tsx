import Text from "@/components/ui/Text";
import { FlatList, View } from "react-native";
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useStorage } from "@/hooks/storage/useStorage";
import { Member } from "@/appsync/API";
import { useEffect } from "react";
import MemberCard from "@/components/api-ui/MemberCard";

interface LastMembersProps {

}

const LastMembers: React.FC<LastMembersProps> = () => {

    const membersHistory = useStorage<Member[]>('@membersHistory', (val) => JSON.parse(val), (val) => JSON.stringify(val))

    useEffect(() => {
        if (!membersHistory.loading && !membersHistory.item) {
            membersHistory.setItem([])
        }
    }, [membersHistory.loading])

    return (
        <View>
            <Text h1>היסטוריית מנויים</Text>
            <Text subtitle>היסטוריית מנויים שנכנסת לראות</Text>
            <FlatList
                data={membersHistory.item}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <MemberCard member={item} />
                    )
                }}
            />
        </View>
    );
}

export default LastMembers;