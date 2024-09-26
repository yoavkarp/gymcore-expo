import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";
import { createParameterInputSchema } from "./useCreateParameterForm";

export const createSetSchema = z.object({
    id: z.string().trim().uuid(),
    reps: z.preprocess((val) => ['undefined', 'null'].includes(typeof (val)) ? undefined : Object.keys(val as any).length === 0 ? undefined : val, createParameterInputSchema.optional()),
    rest: z.preprocess((val) => ['undefined', 'null'].includes(typeof (val)) ? undefined : Object.keys(val as any).length === 0 ? undefined : val, createParameterInputSchema.optional()),
    times: z.number().optional(),
    weight: z.preprocess((val) => ['undefined', 'null'].includes(typeof (val)) ? undefined : Object.keys(val as any).length === 0 ? undefined : val, createParameterInputSchema.optional()),
})
    .refine(data => {
        if (Object.keys(data).filter(d => data[d as keyof typeof data] && d !== 'times').length === 0) {
            return false;
        }
        return true
    }, { message: "אתה חייב להגדיר לפחות פרמטר אחד" })


export type CreateSetFormInput = z.infer<typeof createSetSchema>;

export const useCreateSetForm = (options?: UseFormProps<CreateSetFormInput>) => {
    const form = useForm<CreateSetFormInput>(options);
    return form;
}