import { useSession } from "@/features/auth";
import { View } from "@/components/ui/View";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import Label from "@/components/ui/Label";
import { router } from "expo-router";

const _6DigitsMessage = "קוד אימות חייב להיות בעל 6 ספרות (0-9)";

const validator = z.object({
    otp: z.string().trim().min(6, _6DigitsMessage).max(6, _6DigitsMessage).refine(val => !isNaN(Number(val)), _6DigitsMessage)
})

type OTPFormInput = z.infer<typeof validator>;

const OTPForm = () => {

    const { verifyOTP } = useSession();

    const { control, handleSubmit } = useForm<OTPFormInput>({
        resolver: zodResolver(validator)
    });

    const onSubmit = async (input: OTPFormInput) => {
        await verifyOTP(`${input.otp}`)
        router.replace('/');
    }

    return (
        <View>
            <Controller control={control} name="otp"
                render={({ field: { onChange, value } }) => (
                    <View>
                        <Label>קוד אימות</Label>
                        <TextInput keyboardType="number-pad" key="phone_number" placeholder="XXXXXX" onChangeText={onChange} value={value} />
                    </View>
                )}
            />
            <Button onPress={handleSubmit(onSubmit)}>אישור</Button>
        </View>
    )
}

export default OTPForm;