import { useSession } from "@/auth";
import { useApolloClient } from "@apollo/client";
import { Href, useNavigation } from "expo-router";
import { FunctionComponent } from "react";
import { View } from "react-native";
import { Button, Headline } from 'react-native-paper';

interface HeaderProps {

}

const Header: FunctionComponent<HeaderProps> = () => {
    const nav = useNavigation<any>();
    const { cache } = useApolloClient();
    const { signOut, session } = useSession();
    return (
        <View>
            <Headline>{session?.getIdToken().decodePayload().name}</Headline>
            <Button onPress={async () => await signOut(() => cache.reset())}>
                Sign Out
            </Button>
        </View>
    );
}

export default Header;