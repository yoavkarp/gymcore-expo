import CreateMemberSection from "@/app/(app)/home/create-member-section";
import LastMembers from "@/app/(app)/home/last-members-section";
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