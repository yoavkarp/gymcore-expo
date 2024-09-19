import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

interface CloseButtonProps {
    onPress?: () => any;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={{ padding: 10 }} onPress={onPress}>
            <MaterialIcons name="close" size={30} />
        </TouchableOpacity>
    );
}

export default CloseButton;