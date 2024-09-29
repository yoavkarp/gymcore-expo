import { ExerciseType } from "@/graphql";
import { UseFormProps, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const exerciseFormSchema = z.object({
    xid: z.string({ required_error: "לא נבחר תרגיל מהמאגר" }).trim().uuid(),
    type: z.enum(Object.values(ExerciseType) as [string, ...string[]], { message: "יש לבחור סוג תרגיל" }) as z.ZodEnum<[ExerciseType.Cardio | ExerciseType.Strength, ...(ExerciseType.Cardio | ExerciseType.Strength)[]]>,
    name: z.string().trim().min(1).max(255),
    machine_number: z.string().trim().min(1).max(255).optional().or(z.null()),
    seat_height: z.string().trim().min(1).max(255).optional().or(z.null()),
    notes: z.string().trim().min(1).max(255).optional().or(z.null()),
})

export type ExerciseFormInput = z.infer<typeof exerciseFormSchema>

export const useExerciseForm = (options?: UseFormProps<ExerciseFormInput>) => {
    const form = useForm<ExerciseFormInput>({
        resolver: zodResolver(exerciseFormSchema),
        ...options
    });
    return form;
}