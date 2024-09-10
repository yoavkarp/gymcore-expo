import { FunctionComponent } from "react";
import { View } from "react-native";
import { Headline } from 'react-native-paper';

interface SidebarProps {

}

const Sidebar: FunctionComponent<SidebarProps> = () => {
    return (
        <View>
            <Headline>Sidebar</Headline>
        </View>
    );
}

export default Sidebar;