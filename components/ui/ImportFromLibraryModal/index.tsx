import React, { useImperativeHandle, useState } from "react";
import Modal from "../Modal";
import Text from "../Text";
import Button from "../Button";
import LibraryView from "./LibraryView";
import WorkoutView from "./WorkoutView";
import CloseButton from "../CloseButton";
import { View } from "../View";

interface ImportFromLibraryModalProps {

}

type ImportFromLibraryModal = {
    open: (onPressImport: (workoutId: string) => any) => void;
}

const ImportFromLibraryModal = React.forwardRef<ImportFromLibraryModal, ImportFromLibraryModalProps>((_, ref) => {

    const [visible, setVisible] = useState(false);
    const [onPressImport, setOnPressImport] = useState<(workoutId: string) => any>();
    const [workoutId, setWorkoutId] = useState<string | null>(null);

    useImperativeHandle(ref, () => {
        return {
            open: (callback) => {
                setWorkoutId(null);
                setVisible(true);
                setOnPressImport(() => callback);
            }
        }
    }, [])

    return (
        <Modal style={{ width: 1000 }} visible={visible} onDismiss={() => {
            setVisible(false);
            setOnPressImport(undefined);
        }}>
            <View style={{ flex: 0, alignItems: 'flex-end' }}>
                <CloseButton onPress={() => setVisible(false)} />
            </View>
            {!Boolean(workoutId) ? <LibraryView onPressWorkout={(wid) => setWorkoutId(wid)} /> : <WorkoutView
                onPressBack={() => setWorkoutId(null)}
                onPressImport={async (wid) => {
                    try {
                        await onPressImport?.(wid)
                        setVisible(false);
                    }
                    catch (e) {
                        // show err
                    }
                }}
                workoutId={workoutId!} />}
        </Modal>
    );
})

export default ImportFromLibraryModal;