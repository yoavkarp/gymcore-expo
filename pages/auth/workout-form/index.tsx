import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import CreateWorkoutForm from "./create-workout-form";
import { useWorkoutForm } from "@/contexts/WorkoutContext";
import MainWorkoutScreen from "./main-screen";
import Modal from "@/components/ui/Modal";
import Button, { ButtonRef } from "@/components/ui/Button";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Href, router, useNavigation } from "expo-router";
import { EventArg, EventListenerCallback, EventMapCore, NavigationAction } from "@react-navigation/native";

interface WorkoutFormPageProps {

}


const WorkoutFormPage: React.FC<WorkoutFormPageProps> = () => {
    const { watch, reset } = useWorkoutForm();
    const [continueModalVisible, setContinueModalVisible] = useState(false);
    const [notSavedModalVisible, setNotSavedModalVisible] = useState(false);
    const [leaveRouteAction, setLeaveRouteAction] = useState<any | null>(null);

    const workoutName = watch("name");
    const navigation = useNavigation();

    console.log("Action", leaveRouteAction)


    useEffect(() => {

        type CallbackType = EventArg<"beforeRemove", true, {
            action: NavigationAction;
        }>

        const beforeRemove_callback = (e: CallbackType) => {
            e.preventDefault();
            if (e.data.action) {
                setLeaveRouteAction(e.data.action);
            }
            if (workoutName)
                setNotSavedModalVisible(true);
        }

        navigation.addListener("beforeRemove", beforeRemove_callback)

        return () => {
            setNotSavedModalVisible(false);
            navigation.removeListener("beforeRemove", beforeRemove_callback)
        }

    }, [workoutName])

    useEffect(() => {
        navigation.addListener("focus", () => {
            if (workoutName)
                setContinueModalVisible(true)
        })

        return () => {
            navigation.removeListener("focus", () => {
                if (workoutName)
                    setContinueModalVisible(true)
            })
        }
    }, [])

    return (
        <View>
            <Modal style={{ gap: 8 }} visible={continueModalVisible}>
                <Text h2>קיים אימון</Text>
                <Text subtitle>קיים אימון בתהליך יצירה, האם תרצו להמשיך?</Text>
                <View style={{ gap: 8 }}>
                    <Button onPress={() => setContinueModalVisible(false)}>כן</Button>
                    <Button error onPress={() => { reset(); setContinueModalVisible(false); }}>לא</Button>
                </View>
            </Modal>
            {!workoutName ? (
                <Modal style={{ gap: 8 }}>
                    <Text h1>יצירת אימון חדש</Text>
                    <CreateWorkoutForm />
                </Modal>
            ) : <MainWorkoutScreen />}

            {notSavedModalVisible && <Modal style={{ gap: 8 }} visible>
                <Text h2>לא נשמרו השינויים</Text>
                <Text subtitle>האם תרצו לצאת מהאימון?</Text>
                <View style={{ gap: 8 }}>
                    <Button onPress={() => navigation.dispatch(leaveRouteAction)}>כן</Button>
                    <Button error onPress={() => setNotSavedModalVisible(false)}>לא</Button>
                </View>
            </Modal>}
        </View>
    );
}

export default WorkoutFormPage;