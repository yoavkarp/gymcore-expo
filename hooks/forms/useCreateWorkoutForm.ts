import { ExerciseType } from "@/graphql";
import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";

const parameterInputSchema = z.object({
    max: z.number().or(z.null()).optional(),
    unit: z.string().trim().max(255),
    val: z.number().or(z.null()).optional(),
})
    .refine(data => {
        if (data.max && data.val) {
            return data.max > data.val;
        }
        return true;
    }, { message: "ערך מקסימלי חייב להיות גדול מהערך המינימלי" })
    .refine(data => {
        if (data.max && !data.val) {
            return false;
        }
        return true;
    }, { message: "ערך מינימלי חייב להיות מוגדר כאשר ערך מקסימלי מוגדר" })

const intervalSchema = z.object({
    id: z.string().trim().uuid(),
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

export const setSchema = z.object({
    id: z.string().trim().uuid(),
    reps: z.preprocess((val) => ['undefined', 'null'].includes(typeof (val)) ? undefined : Object.keys(val as any).length === 0 ? undefined : val, parameterInputSchema.optional()),
    rest: z.preprocess((val) => ['undefined', 'null'].includes(typeof (val)) ? undefined : Object.keys(val as any).length === 0 ? undefined : val, parameterInputSchema.optional()),
    times: z.number().optional(),
    weight: z.preprocess((val) => ['undefined', 'null'].includes(typeof (val)) ? undefined : Object.keys(val as any).length === 0 ? undefined : val, parameterInputSchema.optional()),
})
    .refine(data => {
        if (Object.keys(data).filter(d => data[d as keyof typeof data] && d !== 'times').length === 0) {
            return false;
        }
        return true
    }, { message: "אתה חייב להגדיר לפחות פרמטר אחד" })

export const exerciseSchema = z.object({
    id: z.string().trim().uuid().optional(),
    xid: z.string().trim().uuid(),
    type: z.enum([ExerciseType.Cardio, ExerciseType.Strength]),
    angle: parameterInputSchema.optional(),
    machine_number: z.string().trim().min(1).max(255).optional(),
    name: z.string().trim().min(1).max(255),
    notes: z.string().trim().min(1).max(255).optional(),
    resistance: parameterInputSchema.optional(),
    seat_height: z.string().trim().min(1).max(255).optional(),

    intervals: z.record(z.string().trim().uuid(), intervalSchema.or(z.undefined())).default({}),
    intervalsOrder: z.array(z.string().trim().uuid()).default([]),
    sets: z.record(z.string().trim().uuid(), setSchema.or(z.undefined())).default({}),
    setsOrder: z.array(z.string().trim().uuid()).default([]),
})
    .refine(data => {
        if (data.intervals && data.sets) {
            return false;
        }
        return true;
    }, { message: "אינך יכול להגדיר גם סטים וגם אינטרוולים" })
    .refine(data => {
        if (data.intervals) {
            return data.intervalsOrder.length > 0;
        }
        return true;
    }, { message: "אינך יכול להגדיר אינטרוולים ריקים" })
    .refine(data => {
        if (data.sets) {
            return data.setsOrder.length > 0;
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
    exercises: z.record(z.string().trim().uuid(), exerciseSchema.or(z.undefined())).default({}),
    exercisesOrder: z.array(z.string().trim().uuid()).default([]),
    memberId: z.string().trim().uuid().or(z.undefined()).optional(),
    name: z.string().trim().min(1).max(255),
    notes: z.string().trim().max(255).or(z.undefined()).optional(),
    trainerId: z.string().trim().uuid()
})

export type CreateWorkoutFormInput = z.infer<typeof createWorkoutSchema>;
export type CreateExerciseFormInput = z.infer<typeof exerciseSchema>;
export type CreateSetFormInput = z.infer<typeof setSchema>;
export type CreateIntervalFormInput = z.infer<typeof intervalSchema>;
export type CreateParameterInput = z.infer<typeof parameterInputSchema>;

export const useCreateWorkoutForm = (options?: UseFormProps<CreateWorkoutFormInput>) => {
    const form = useForm<CreateWorkoutFormInput>(options);
    return form;
}