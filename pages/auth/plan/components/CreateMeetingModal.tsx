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


type CreateMeetingModal = {
    open: () => void;
    close: () => void;
}

const CreateMeetingModal = forwardRef<CreateMeetingModal>((_, ref) => {

    const [visible, setIsVisible] = useState(false);
    const { planId } = usePlan();

    const [createEvent, { loading, error: apiError }] = useCreateEventMutation();
    const [start_at, setStart_at] = useState(new Date());


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
        <Modal visible={visible} dismissable onDismiss={() => setIsVisible(false)} style={{ gap: 8 }}>
            <Text h1>יצירת מפגש</Text>
            <View>
                <Label>תאריך המפגש</Label>
                <DateSelect
                    onChange={(date) => setStart_at(prev => {
                        console.log(`${date.split("T")[0]}T${prev.toISOString().split("T")[1]}`)
                        // new Date(`${date.split("T")[0]}T${prev.toISOString().split("T")[1]}`)
                        return prev;
                    })}
                    isoDate={start_at.toISOString()} />
                <TimeSelect onChange={(date) => setStart_at(prev => {
                    console.log(`${prev.toISOString().split("T")[0]}T${date.split("T")[1]}`)
                    //new Date(`${prev.toISOString().split("T")[0]}T${date.split("T")[1]}`)
                    return prev;
                })} isoDate={start_at.toISOString()} />
            </View>
            {apiError && <Text error>שגיאת שרת: {apiError.message}</Text>}
            <Button isLoading={loading} disabled={loading} onPress={onSubmit}>יצירת תכנית</Button>
        </Modal>
    );
})

export default CreateMeetingModal;