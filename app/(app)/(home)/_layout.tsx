import { View } from "react-native";
import Text from "@/components/ui/Text";
import HomePage from ".";
interface HomePageProps {

}

const HomeLayout: React.FC<HomePageProps> = () => {
    return (
        <View style={{ flex: 1 }}>
            <HomePage />
        </View>
    );
}

export default HomeLayout;