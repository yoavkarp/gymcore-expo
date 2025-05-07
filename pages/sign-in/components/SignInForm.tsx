import { useSession } from "@/features/auth";
import { View } from "@/components/ui/View";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import Label from "@/components/ui/Label";
import { theme } from "@/theme";

const validator = z.object({
    username: z.string().trim().min(10).max(10).refine(val => !isNaN(Number(val))).or(z.string().email())
})

type SignInFormInput = z.infer<typeof validator>;

const SignInForm = () => {

    const { signIn } = useSession();

    const { control, handleSubmit, formState: { isSubmitting } } = useForm<SignInFormInput>({
        resolver: zodResolver(validator),
        defaultValues: {
            username: ""
        }
    });

    const onSubmit = async (input: SignInFormInput) => {
        console.error("GYMCORE input is", input.username)

        if (z.string().email().safeParse(input.username).success) {
            // send to email
            alert("Send OTP To email doesnt set yet.")
        }
        else {
            try {
                console.log("GYMCORE", "try to sign in with", `+972${input.username}`)
                await signIn(`+972${input.username}`)
            }
            catch (e) {
                console.error("GYMCORE", e)
            }
        }

    }

    return (
        <View style={{ gap: theme.spacing.md }}>
            <Controller control={control} name="username"
                render={({ field: { onChange, value } }) => (
                    <View>
                        <Label>מספר טלפון</Label>
                        <TextInput keyboardType="phone-pad" key="phone_number" placeholder="מספר טלפון" onChangeText={onChange} value={value} />
                    </View>
                )}
            />
            <Button isLoading={isSubmitting} disabled={isSubmitting} onPress={handleSubmit(onSubmit)}>התחברות</Button>
        </View>
    )
}

export default SignInForm;