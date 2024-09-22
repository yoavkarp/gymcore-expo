import CreateMemberSection from "@/pages/auth/home/create-member-section";
import LastMembers from "@/pages/auth/home/last-members-section";
import { View } from "@/components/ui/View";

interface HomePageProps {

}

const HomePage: React.FC<HomePageProps> = () => {
    return (
        <View style={{ flex: 1, gap: 50, flexDirection: 'row' }}>
            <CreateMemberSection />
            <LastMembers />
        </View>
    );
}

export default HomePage;