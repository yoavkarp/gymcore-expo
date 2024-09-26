import { ExerciseType } from "@/graphql";
import { UseFormProps, useForm } from "react-hook-form";
import { z } from "zod";
import { createParameterInputSchema } from "./useCreateParameterForm";
import { createSetSchema } from "./useCreateSetForm";
import { createIntervalSchema } from "./useCreateIntervalForm";

export const createExerciseSchema = z.object({
    id: z.string().trim().uuid().optional(),
    xid: z.string().trim().uuid(),
    type: z.enum(Object.values(ExerciseType) as [string, ...string[]]),
    angle: createParameterInputSchema.optional(),
    machine_number: z.string().trim().min(1).max(255).optional(),
    name: z.string().trim().min(1).max(255),
    notes: z.string().trim().min(1).max(255).optional(),
    resistance: createParameterInputSchema.optional(),
    seat_height: z.string().trim().min(1).max(255).optional(),

    intervals: z.array(createIntervalSchema).or(z.undefined()),
    sets: z.array(createSetSchema).or(z.undefined()),
})
    .refine(data => {
        if (data.intervals && data.sets) {
            return false;
        }
        return true;
    }, { message: "אינך יכול להגדיר גם סטים וגם אינטרוולים" })
    .refine(data => {
        if (data.intervals) {
            return data.intervals.length > 0;
        }
        return true;
    }, { message: "אינך יכול להגדיר אינטרוולים ריקים" })
    .refine(data => {
        if (data.sets) {
            return data.sets.length > 0;
        }
        return true;
    }, { message: "אינך יכול להגדיר סטים ריקים" })
    .refine(data => {
        if (!data.sets && !data.intervals) {
            return false;
        }
        return true;
    }, { message: "אתה חייב להגדיר סטים או אינטרוולים" })

export type CreateExerciseFormInput = z.infer<typeof createExerciseSchema>;

export const useCreateExerciseForm = (options?: UseFormProps<CreateExerciseFormInput>) => {
    const form = useForm<CreateExerciseFormInput>(options);
    return form;
}