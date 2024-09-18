import { useForm, UseFormProps } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const signInFormSchema = z.object({
    phone_number: z.string().min(10, { message: "מספר טלפון לא חוקי" }).min(10, { message: "מספר טלפון לא חוקי" }),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/, "סיסמה לא חוקית")
})

export type SignInFormValues = z.infer<typeof signInFormSchema>

export const useSignInForm = (props?: UseFormProps<SignInFormValues>) => {
    const formHook = useForm<SignInFormValues>({
        resolver: zodResolver(signInFormSchema),
        ...props
    })

    return formHook

}