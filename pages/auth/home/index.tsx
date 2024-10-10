import MembersSection from "./components/MembersSection";
import MembersHistorySection from "./components/MembersHistorySection";
import { View } from "@/components/ui/View";
import { Dimensions } from "react-native";
import { theme } from "@/theme";
import Section from "@/components/ui/Section";

interface HomePageProps {

}

const HomePage: React.FC<HomePageProps> = () => {

    return (
        <View style={{ flex: 1, gap: theme.spacing.md, flexDirection: 'row', paddingBottom: theme.spacing.md }}>
            <Section style={{ flex: 1 }}>
                <MembersSection />
            </Section>
            <Section style={{ flex: 1 }}>
                <MembersHistorySection />
            </Section>
        </View>
    );
}

export default HomePage;