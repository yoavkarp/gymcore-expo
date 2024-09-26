import { useForm, UseFormProps } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { phoneNumberRegex } from '@/constants/regex';

export const createTrainerFormSchema = z.object({
    phone_number: z.preprocess((item) => item || undefined, z.string({ required_error: "שדה חובה" }).regex(phoneNumberRegex, "מספר טלפון לא חוקי")),
    name: z.preprocess(item => item || undefined, z.string({ required_error: "שדה חובה" }).min(2).max(50)),
    email: z.preprocess(item => item || undefined, z.string().trim().email("אימייל לא חוקי").or(z.undefined())),
    birthdate: z.string({ required_error: "שדה חובה" }).trim().date(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"], { message: "מגדר לא חוקי", required_error: "שדה חובה" }),
    address: z.preprocess(item => item || undefined, z.string().trim().min(2).max(100).or(z.undefined())),
})

export type CreateTrainerFormValues = z.infer<typeof createTrainerFormSchema>

export const useCreateTrainerForm = (props?: UseFormProps<CreateTrainerFormValues>) => useForm<CreateTrainerFormValues>({
    resolver: zodResolver(createTrainerFormSchema),
    ...props
})