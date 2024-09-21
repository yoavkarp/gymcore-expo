import { useSession } from "@/auth";
import { FunctionComponent } from "react";
import { View } from "react-native";
import Text from "./ui/Text";

interface SidebarProps {

}

const Sidebar: FunctionComponent<SidebarProps> = () => {
    const { session } = useSession();
    const sessionPayload = session!.getIdToken().decodePayload();
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text h1>{sessionPayload.name}</Text>
        </View>
    );
}

export default Sidebar;