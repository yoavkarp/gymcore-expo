import MembersSection from "./components/MembersSection";
import MembersHistorySection from "./components/MembersHistorySection";
import { View } from "@/components/ui/View";
import { Dimensions } from "react-native";

interface HomePageProps {

}

const HomePage: React.FC<HomePageProps> = () => {

    return (
        <View style={{ flex: 1, gap: 50, flexDirection: 'row' }}>
            <MembersSection />
            <MembersHistorySection />
        </View>
    );
}

export default HomePage;