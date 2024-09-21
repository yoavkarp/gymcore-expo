import { useSession } from "@/auth";
import { useApolloClient } from "@apollo/client";
import { Href, router, useNavigation, usePathname, useRouter } from "expo-router";
import { FunctionComponent } from "react";
import { TouchableOpacity, View } from "react-native";
import Text from "./ui/Text";

interface HeaderProps {

}

const Header: FunctionComponent<HeaderProps> = () => {
    const nav = useNavigation<any>();
    const { cache } = useApolloClient();
    const { signOut, session } = useSession();
    const p = useRouter();

    return (
        <View>
            <Text h1>{session?.getIdToken().decodePayload().name}</Text>
            <TouchableOpacity onPress={() => router.back()}>
                <Text>Go Back</Text>
            </TouchableOpacity>

        </View>
    );
}

export default Header;