import { UseFormProps, useForm } from "react-hook-form";
import { z } from "zod";
import { parameterInputSchema } from "./useParameterForm";

export const createIntervalSchema = z.object({
    angle: parameterInputSchema.optional(),
    distance: parameterInputSchema.optional(),
    duration: parameterInputSchema.optional(),
    intensity: parameterInputSchema.optional(),
    resistance: parameterInputSchema.optional(),
    rest: parameterInputSchema.optional(),
    tempo: parameterInputSchema.optional(),
})
    .refine(data => {
        if (Object.keys(data).filter(d => data[d as keyof typeof data]).length === 0) {
            return false;
        }
        return true
    }, { message: "אתה חייב להגדיר לפחות פרמטר אחד" })


export type IntervalFormInput = z.infer<typeof createIntervalSchema>;

export const useIntervalForm = (options?: UseFormProps<IntervalFormInput>) => {
    const form = useForm<IntervalFormInput>(options);
    return form;
}
