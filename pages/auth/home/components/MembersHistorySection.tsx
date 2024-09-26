import Text from "@/components/ui/Text";
import { FlatList, TouchableOpacity, View } from "react-native";
import MemberCard from "@/components/api-ui/MemberCard";
import { Href, router } from "expo-router";
import { useMembersHistory } from "@/features/members";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Member } from "@/graphql";

interface MembersHistorySectionProps {

}

const MembersHistorySection: React.FC<MembersHistorySectionProps> = () => {

    const [membersHistory] = useMembersHistory();

    const handleMemberCardPress = (member: Partial<Member>) => {
        if (member.id)
            router.navigate(`member/${member.id}` as Href)
    }

    return (
        <View>
            <Text h1>היסטוריית מנויים</Text>
            <Text subtitle>היסטוריית מנויים שנכנסת לראות</Text>
            <FlatList
                data={membersHistory}
                keyExtractor={(item) => item.id!}
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

export default MembersHistorySection;