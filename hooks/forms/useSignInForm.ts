import { useForm, UseFormProps } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const signInFormSchema = z.object({
    phone_number: z.string().length(10, { message: 'Phone number must be 10 digits' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' })
})

export type SignInFormValues = z.infer<typeof signInFormSchema>

export const useSignInForm = (props?: UseFormProps<SignInFormValues>) => useForm<SignInFormValues>({
    resolver: props?.resolver || zodResolver(signInFormSchema),
    defaultValues: {
        phone_number: '0505716749',
        password: '12345678',
        ...props?.defaultValues
    }
})