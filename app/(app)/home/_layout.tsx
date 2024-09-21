import { View } from "react-native";
import Text from "@/components/ui/Text";
import HomePage from ".";
import MembersHistoryProvider from "@/contexts/MembersHistoryContext";
interface HomePageProps {

}

const HomeLayout: React.FC<HomePageProps> = () => {
    return (
        <MembersHistoryProvider>
            <View style={{ flex: 1 }}>
                <HomePage />
            </View>
        </MembersHistoryProvider>
    );
}

export default HomeLayout;