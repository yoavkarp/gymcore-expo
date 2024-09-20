import Text from "@/components/ui/Text";
import { useLocalSearchParams } from "expo-router";

interface MemberPageProps {

}

const MemberPage: React.FC<MemberPageProps> = () => {
    const { id } = useLocalSearchParams();
    return (
        <Text>
            MemberPage {id}
        </Text>
    );
}

export default MemberPage;