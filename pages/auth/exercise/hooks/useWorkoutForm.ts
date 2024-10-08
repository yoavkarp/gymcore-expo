import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";

export const updateWorkoutSchema = z.object({
    name: z.string().trim().min(1).max(255).optional(),
    notes: z.string().trim().min(1).max(255).optional().or(z.null()),
})
    .refine(data => {
        if (Object.keys(data).length === 0) {
            return false;
        }
        return true
    }, { message: "אתה חייב להגדיר לפחות פרמטר אחד" })


export type WorkoutFormInput = z.infer<typeof updateWorkoutSchema>;

export const useWorkoutForm = (options?: UseFormProps<WorkoutFormInput>) => {
    const form = useForm<WorkoutFormInput>(options);
    return form;
}