import { View } from "react-native";
import Text from "@/components/ui/Text";
import CreateMemberSection from "./create-member-section";
import LastMembers from "./last-members-section";
import MembersHistoryProvider from "@/contexts/MembersHistoryContext";
interface HomePageProps {

}

const HomePage: React.FC<HomePageProps> = () => {
    return (
        <MembersHistoryProvider>
            <View style={{ flex: 1, flexDirection: 'row', gap: 50 }}>
                <CreateMemberSection />
                <LastMembers />
            </View>
        </MembersHistoryProvider>

    );
}

export default HomePage;