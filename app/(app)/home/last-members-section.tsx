import Text from "@/components/ui/Text";
import { FlatList, TouchableOpacity, View } from "react-native";
import MemberCard from "@/components/api-ui/MemberCard";
import { router } from "expo-router";
import { useMembersHistory } from "@/contexts/MembersHistoryContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LastMembersProps {

}

const LastMembers: React.FC<LastMembersProps> = () => {

    const [membersHistory] = useMembersHistory();
    AsyncStorage.clear();

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