import React, { useImperativeHandle, useState } from "react";
import Modal from "./Modal";
import Text from "./Text";
import Button from "./Button";

interface YesNoDialogProps {
    title?: string;
    subtitle?: string;
}

type YesNoDialog = {
    open: (onPressYes: () => any) => void;
}

const YesNoDialog = React.forwardRef<YesNoDialog, YesNoDialogProps>(({ title = "נדרש אישור להמשך", subtitle = "האם ברצונך להמשיך בפעולה? לא תהיה אפשרות לחזור אחורה" }, ref) => {

    const [visible, setVisible] = useState(false);
    const [onPressYes, setOnPressYes] = useState<() => any>();

    useImperativeHandle(ref, () => {
        return {
            open: (callback) => {
                setVisible(true);
                setOnPressYes(() => callback);
            }
        }
    }, [])

    return (
        <Modal visible={visible} dismissable onDismiss={() => {
            setVisible(false);
            setOnPressYes(undefined);
        }}>
            <Text h1>{title}</Text>
            <Text subtitle>{subtitle}</Text>

            <Button error onPress={() => {
                onPressYes?.();
                setVisible(false);
                setOnPressYes(undefined);
            }}>כן</Button>
            <Button onPress={() => {
                setVisible(false);
                setOnPressYes(undefined);
            }}>לא</Button>
        </Modal>
    );
})

export default YesNoDialog;