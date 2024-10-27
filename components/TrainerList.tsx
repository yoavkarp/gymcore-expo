
import List from "./ui/List";
import { View } from "./ui/View";
import Text from "./ui/Text";
import Button from "./ui/Button";
import CloseButton from "./ui/CloseButton";
import { useClub } from "@/features/club/components/ClubProvider";

const TrainerList: React.FC = () => {

    const { currentTrainer, setIsTrainersListVisible, trainers, setIsCreateTrainerModalVisible, setCurrentTrainer } = useClub();

    return (
        <View style={{ gap: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text h1>בחירת מאמן</Text>
                {Boolean(currentTrainer?.id) && <CloseButton onPress={() => setIsTrainersListVisible(false)} />}
            </View>
            <List
                data={trainers.map((trainer) => ({
                    key: trainer.id || "",
                    title: trainer.name || ""
                }))}
                onPressItem={(trainer) => {
                    setCurrentTrainer(trainer.key)
                    setIsTrainersListVisible(false)
                }}
                defaultSelectedKey={currentTrainer?.id}
            />
            <Button style={{ alignSelf: 'flex-end' }} onPress={() => setIsCreateTrainerModalVisible(true)}>מאמן חדש</Button>
        </View>
    );
}

export default TrainerList;