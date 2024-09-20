import Text from "@/components/ui/Text";
import { FlatList, TouchableOpacity, View } from "react-native";
import MemberCard from "@/components/api-ui/MemberCard";
import { useMembersHistory } from "@/contexts/MembersHistoryContext";
import { router } from "expo-router";

interface LastMembersProps {

}

const LastMembers: React.FC<LastMembersProps> = () => {

    const [membersHistory] = useMembersHistory()

    return (
        <View>
            <Text h1>היסטוריית מנויים</Text>
            <Text subtitle>היסטוריית מנויים שנכנסת לראות</Text>
            <FlatList
                data={membersHistory}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => router.navigate(`/(member)/${item.id}`)}>
                            <MemberCard member={item} />
                        </TouchableOpacity>

                    )
                }}
            />
        </View>
    );
}

export default LastMembers;