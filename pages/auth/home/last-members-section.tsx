import Text from "@/components/ui/Text";
import { FlatList, TouchableOpacity, View } from "react-native";
import MemberCard from "@/components/api-ui/MemberCard";
import { Href, router } from "expo-router";
import { useMembersHistory } from "@/contexts/MembersHistoryContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Member } from "@/appsync/API";

interface LastMembersProps {

}

const LastMembers: React.FC<LastMembersProps> = () => {

    const [membersHistory] = useMembersHistory();

    const handleMemberCardPress = (member: Member) => {
        router.navigate(`(member)/${member.id}` as Href)
    }

    return (
        <View>
            <Text h1>היסטוריית מנויים</Text>
            <Text subtitle>היסטוריית מנויים שנכנסת לראות</Text>
            <FlatList
                data={membersHistory}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => handleMemberCardPress(item)}>
                            <MemberCard member={item} />
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
}

export default LastMembers;