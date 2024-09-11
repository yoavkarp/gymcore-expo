import { useSession } from "@/auth";
import { FunctionComponent } from "react";
import { View } from "react-native";
import { Headline } from 'react-native-paper';

interface SidebarProps {

}

const Sidebar: FunctionComponent<SidebarProps> = () => {
    const { session } = useSession();
    const sessionPayload = session!.getIdToken().decodePayload();
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Headline>{sessionPayload.name}</Headline>
        </View>
    );
}

export default Sidebar;