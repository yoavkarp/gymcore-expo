import { View } from "react-native";
import Text from "@/components/ui/Text";
import HomePage from ".";
import { MembersHistoryProvider } from "@/features/members";
import { Slot } from "expo-router";
interface HomePageProps {

}

const HomeLayout: React.FC<HomePageProps> = () => {
    return (
        <MembersHistoryProvider>
            <Slot />
        </MembersHistoryProvider>
    );
}

export default HomeLayout;