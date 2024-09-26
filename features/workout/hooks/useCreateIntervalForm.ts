import { UseFormProps, useForm } from "react-hook-form";
import { z } from "zod";
import { createParameterInputSchema } from "./useCreateParameterForm";

export const createIntervalSchema = z.object({
    id: z.string().trim().uuid(),
    angle: createParameterInputSchema.optional(),
    distance: createParameterInputSchema.optional(),
    duration: createParameterInputSchema.optional(),
    intensity: createParameterInputSchema.optional(),
    resistance: createParameterInputSchema.optional(),
    rest: createParameterInputSchema.optional(),
    tempo: createParameterInputSchema.optional(),
})
    .refine(data => {
        if (Object.keys(data).filter(d => data[d as keyof typeof data]).length === 0) {
            return false;
        }
        return true
    }, { message: "אתה חייב להגדיר לפחות פרמטר אחד" })


export type CreateIntervalFormInput = z.infer<typeof createIntervalSchema>;

export const useCreateIntervalForm = (options?: UseFormProps<CreateIntervalFormInput>) => {
    const form = useForm<CreateIntervalFormInput>(options);
    return form;
}
