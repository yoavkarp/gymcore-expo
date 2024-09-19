import { useForm, UseFormProps } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { phoneNumberRegex } from '@/constants/regex';

export const createMemberFormSchema = z.object({
    phone_number: z.preprocess((item) => item || undefined, z.string({ required_error: "שדה חובה" }).regex(phoneNumberRegex, "מספר טלפון לא חוקי")),
    name: z.preprocess(item => item || undefined, z.string({ required_error: "שדה חובה" }).min(2).max(50)),
    email: z.preprocess(item => item || undefined, z.string().trim().email("אימייל לא חוקי").or(z.undefined())),
    birthdate: z.string({ required_error: "שדה חובה" }).trim().date(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"], { message: "מגדר לא חוקי", required_error: "שדה חובה" }),
    address: z.preprocess(item => item || undefined, z.string().trim().min(2).max(100).or(z.undefined())),
    measurement: z.object({
        fat: z.number().min(0).max(100),
        weight: z.number().min(0).max(400),
        height: z.number().min(0).max(400),
        heart_rate: z.number().min(0).max(200),
    }).optional().refine((data) => {
        // Check that at least one property is present (not undefined or null)
        if (!data) {
            return true;
        }
        return Object.values(data).some(value => value !== undefined && value !== null);
    }, {
        message: "At least one property must be provided"
    })
})

export type CreateMemberFormValues = z.infer<typeof createMemberFormSchema>

export const useCreateMemberForm = (props?: UseFormProps<CreateMemberFormValues>) => useForm<CreateMemberFormValues>({
    resolver: zodResolver(createMemberFormSchema),
    ...props
})