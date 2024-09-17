import { useForm, UseFormProps } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const signInFormSchema = z.object({
    phone_number: z.string().min(10, { message: "מספר טלפון לא חוקי" }).min(10, { message: "מספר טלפון לא חוקי" }),
    password: z.string().min(8, { message: "סיסמה חייבת להיות באורך של 8 תווים לפחות" })
})

export type SignInFormValues = z.infer<typeof signInFormSchema>

export const useSignInForm = (props?: UseFormProps<SignInFormValues>) => useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    ...props
})