import { ExerciseType } from "@/graphql";
import { UseFormProps, useForm } from "react-hook-form";
import { z } from "zod";
import { createParameterInputSchema } from "./useCreateParameterForm";
import { createSetSchema } from "./useCreateSetForm";
import { createIntervalSchema } from "./useCreateIntervalForm";
import { zodResolver } from "@hookform/resolvers/zod";

export const createExerciseSchema = z.object({
    xid: z.string({ required_error: "לא נבחר תרגיל מהמאגר" }).trim().uuid(),
    type: z.enum(Object.values(ExerciseType) as [string, ...string[]], { message: "יש לבחור סוג תרגיל" }) as z.ZodEnum<[ExerciseType.Cardio | ExerciseType.Strength, ...(ExerciseType.Cardio | ExerciseType.Strength)[]]>,
    name: z.string().trim().min(1).max(255),
})

export type CreateExerciseFormInput = z.infer<typeof createExerciseSchema>

export const useCreateExerciseForm = (options?: UseFormProps<CreateExerciseFormInput>) => {
    const form = useForm<CreateExerciseFormInput>({
        resolver: zodResolver(createExerciseSchema),
        ...options
    });
    return form;
}