import { Trainer } from "@/graphql";
import { FlatList } from "react-native";
import List from "./ui/List";
import { View } from "./ui/View";
import Text from "./ui/Text";
import Button from "./ui/Button";

interface TrainerListProps {
    trainers: Partial<Trainer>[];
    onPressNewTrainer?: () => void;
    onPressTrainer?: (trainerId: string) => void;
    currentTrainerId?: string;
}

const TrainerList: React.FC<TrainerListProps> = ({ trainers, onPressNewTrainer, onPressTrainer, currentTrainerId }) => {
    return (
        <View style={{ gap: 10 }}>
            <Text h1>בחירת מאמן</Text>
            <List
                data={trainers.map((trainer) => ({
                    key: trainer.id || "",
                    title: trainer.name || ""
                }))}
                onPressItem={(trainer) => onPressTrainer?.(trainer.key)}
                defaultSelectedKey={currentTrainerId}
            />
            <Button style={{ alignSelf: 'flex-end' }} onPress={onPressNewTrainer}>מאמן חדש</Button>
        </View>
    );
}

export default TrainerList;