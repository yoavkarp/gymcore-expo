import { useSession } from "@/features/auth";
import { View } from "@/components/ui/View";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import Label from "@/components/ui/Label";
import { router } from "expo-router";
import { theme } from "@/theme";

const _6DigitsMessage = "קוד אימות חייב להיות בעל 6 ספרות (0-9)";

const validator = z.object({
    otp: z.string().trim().min(6, _6DigitsMessage).max(6, _6DigitsMessage).refine(val => !isNaN(Number(val)), _6DigitsMessage)
})

type OTPFormInput = z.infer<typeof validator>;

const OTPForm = () => {

    const { verifyOTP, cancelSignIn } = useSession();

    const { control, handleSubmit, formState: { isSubmitting } } = useForm<OTPFormInput>({
        resolver: zodResolver(validator)
    });

    const onSubmit = async (input: OTPFormInput) => {
        await verifyOTP(`${input.otp}`)
        router.replace('/');
    }

    return (
        <View style={{ gap: theme.spacing.md }}>
            <Controller control={control} name="otp"
                render={({ field: { onChange, value } }) => (
                    <View>
                        <Label>קוד אימות</Label>
                        <TextInput keyboardType="number-pad" key="phone_number" placeholder="XXXXXX" onChangeText={onChange} value={value} />
                    </View>
                )}
            />
            <Button isLoading={isSubmitting} disabled={isSubmitting} onPress={handleSubmit(onSubmit)}>אישור</Button>
            <Button error onPress={cancelSignIn}>ביטול</Button>
        </View>
    )
}

export default OTPForm;