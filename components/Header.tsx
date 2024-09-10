import { FunctionComponent } from "react";
import { View } from "react-native";
import { Headline } from 'react-native-paper';

interface HeaderProps {

}

const Header: FunctionComponent<HeaderProps> = () => {
    return (
        <View>
            <Headline>Header</Headline>
        </View>
    );
}

export default Header;