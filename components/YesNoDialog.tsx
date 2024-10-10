import React, { useImperativeHandle, useState } from "react";
import Modal from "./ui/Modal";
import Text from "./ui/Text";
import Button from "./ui/Button";

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
    const [isPending, setIsPending] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            open: (callback) => {
                setVisible(true);
                setOnPressYes(() => callback);
            }
        }
    }, [])

    return (
        <Modal pointerEvents={isPending ? 'none' : undefined} visible={visible} dismissable onDismiss={() => {
            setVisible(false);
            setOnPressYes(undefined);
        }}>
            <Text h1>{title}</Text>
            <Text subtitle>{subtitle}</Text>
            <Button isLoading={isPending} disabled={isPending} error onPress={async () => {
                setIsPending(true)
                await onPressYes?.();
                setIsPending(false);
                setVisible(false);
                setOnPressYes(undefined);
            }}>כן</Button>
            <Button onPress={() => {
                setVisible(false);
                setOnPressYes(undefined);
            }}>לא</Button>
        </Modal>
    )
})

YesNoDialog.displayName = "YesNoDialog";

export default YesNoDialog;