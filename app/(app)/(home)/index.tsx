import { View } from "react-native";
import Text from "@/components/ui/Text";
import CreateMemberSection from "./create-member-section";
import LastMembers from "./last-members-section";
interface HomePageProps {

}

const HomePage: React.FC<HomePageProps> = () => {
    return (
        <View style={{ flex: 1, flexDirection: 'row', gap: 50 }}>
            <CreateMemberSection />
            <LastMembers />
        </View>
    );
}

export default HomePage;