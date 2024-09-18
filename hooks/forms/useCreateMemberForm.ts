import { useForm, UseFormProps } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateMemberInput, Gender } from '@/appsync/API';

export const createMemberFormSchema = z.object({
    phone_number: z.string().min(10, { message: "מספר טלפון לא חוקי" }).max(10, { message: "מספר טלפון לא חוקי" }),
    name: z.string().min(2).max(50),
    email: z.string().email().optional(),
    birthdate: z.string().date(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"], { message: "מגדר לא חוקי" }),
    address: z.string().min(2).max(100).optional(),
    measurement: z.object({
        fat: z.number().min(0).max(100),
        weight: z.number().min(0).max(400),
        height: z.number().min(0).max(400),
        heart_rate: z.number().min(0).max(200),
    }).refine((data) => {
        // Check that at least one property is present (not undefined or null)
        return Object.values(data).some(value => value !== undefined && value !== null);
    }, {
        message: "At least one property must be provided"
    })
})

export type CreateMemberFormValues = z.infer<typeof createMemberFormSchema>

export const useCreateMemberForm = (props?: UseFormProps<CreateMemberFormValues>) => useForm<CreateMemberFormValues>({
    resolver: props?.resolver || zodResolver(createMemberFormSchema),
    ...props
})