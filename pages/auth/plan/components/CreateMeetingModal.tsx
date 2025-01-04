import Modal from "@/components/ui/Modal";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import Button from "@/components/ui/Button";
import { forwardRef, useImperativeHandle, useState } from "react";
import Label from "@/components/ui/Label";
import { useCreateEventMutation } from "@/graphql";
import { usePlan } from "@/features/plan/components/PlanProvider";
import DateSelect from "@/components/ui/DateSelect";
import TimeSelect from "@/components/ui/TimeSelect";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { theme } from "@/theme";


type CreateMeetingModal = {
    open: () => void;
    close: () => void;
}

const CreateMeetingModal = forwardRef<CreateMeetingModal>((_, ref) => {

    const [visible, setIsVisible] = useState(false);
    const { planId } = usePlan();
    const [show] = useSnackbar()

    const [createEvent, { loading, error: apiError }] = useCreateEventMutation({
        onCompleted() {
            show("המפגש נוצר בהצלחה");
            setIsVisible(false);
        },
        onError(err) {
            console.log(JSON.stringify(err, null, 2));
            show("שגיאה בעת יצירת מפגש: " + err.message, "error");
        },
        update(cache, { data }) {
            const identifier = cache.identify({ id: planId, __typename: "Plan" });
            const res = cache.modify({
                id: identifier,
                fields: {
                    events(exists, { toReference }) {
                        return {
                            ...exists,
                            items: [toReference(data?.createEvent!), ...exists.items]
                        };
                    }
                },
            })
        },
    });
    const [start_at, setStart_at] = useState(new Date(new Date().setSeconds(0, 0)));


    useImperativeHandle(ref, () => {
        return {
            open: () => setIsVisible(true),
            close: () => setIsVisible(false)
        }
    }, [])

    const onSubmit = () => {
        return createEvent({
            variables: {
                input: {
                    planId,
                    start_at: start_at.toISOString()
                }
            }
        })
    }

    console.log(start_at);

    return (
        <Modal visible={visible} onDismiss={() => setIsVisible(false)} style={{ gap: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text h1>יצירת מפגש</Text>
            </View>

            <View style={{ gap: theme.spacing.md }}>
                <Label>תאריך המפגש</Label>
                <DateSelect
                    onChange={(date) => setStart_at(prev => {
                        return new Date(`${date.split("T")[0]}T${prev.toISOString().split("T")[1]}`);
                    })}
                    isoDate={start_at.toISOString()} />
                <TimeSelect onChange={(date) => setStart_at(prev => {
                    return new Date(`${prev.toISOString().split("T")[0]}T${date.split("T")[1]}`)
                })} isoDate={start_at.toISOString()} />
            </View>
            {apiError && <Text error>שגיאת שרת: {apiError.message}</Text>}
            <Button isLoading={loading} disabled={loading} onPress={onSubmit}>יצירת מפגש</Button>
        </Modal>
    );
})

export default CreateMeetingModal;