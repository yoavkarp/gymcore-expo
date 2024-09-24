import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";

const parameterInputSchema = z.object({
    max: z.number().optional(),
    min: z.number().optional(),
    unit: z.string().trim().max(255),
    val: z.number(),
})
    .refine(data => {
        if (data.max && data.min) {
            return data.max > data.min;
        }
        return true;
    }, { message: "ערך מקסימלי חייב להיות גדול מהערך המינימלי" })
    .refine(data => {
        if (data.max && !data.min) {
            return false;
        }
        return true;
    }, { message: "ערך מינימלי חייב להיות מוגדר כאשר ערך מקסימלי מוגדר" })
    .refine(data => {
        if (data.val && (data.max || data.min)) {
            return false;
        }
        return true;
    }, { message: "ערך לא יכול להיות מוגדר יחד עם ערך מינימלי או מקסימלי" })

const intervalSchema = z.object({
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

const setSchema = z.object({
    reps: parameterInputSchema.optional(),
    rest: parameterInputSchema.optional(),
    times: parameterInputSchema.optional(),
    weight: parameterInputSchema.optional(),
})
    .refine(data => {
        if (Object.keys(data).filter(d => data[d as keyof typeof data] && d !== 'times').length === 0) {
            return false;
        }
        return true
    }, { message: "אתה חייב להגדיר לפחות פרמטר אחד" })

const exerciseSchema = z.object({
    angle: parameterInputSchema.optional(),
    machine_number: z.string().trim().min(1).max(255).optional(),
    name: z.string().trim().min(1).max(255).optional(),
    notes: z.string().trim().min(1).max(255).optional(),
    resistance: parameterInputSchema.optional(),
    seat_height: z.string().trim().min(1).max(255).optional(),

    intervals: z.array(intervalSchema).min(1).max(20).optional(),
    sets: z.array(z.number()).optional(),
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

const createWorkoutSchema = z.object({
    clubId: z.string().trim().uuid(),
    exercises: exerciseSchema,
    memberId: z.string().trim().uuid().or(z.undefined()).optional(),
    name: z.string().trim().min(1).max(255),
    notes: z.string().trim().max(255).or(z.undefined()).optional(),
    trainerId: z.string().trim().uuid()
})

export type CreateWorkoutFormInput = z.infer<typeof createWorkoutSchema>;

export const useCreateWorkoutForm = (options?: UseFormProps<CreateWorkoutFormInput>) => {
    const form = useForm<CreateWorkoutFormInput>(options);
    return form;
}