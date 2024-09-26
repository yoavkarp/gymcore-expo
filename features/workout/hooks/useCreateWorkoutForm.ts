import { CreateWorkoutInput } from "@/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";
import { createExerciseSchema } from "./useCreateExerciseForm";

export const createWorkoutSchema = z.object({
    clubId: z.string().trim().uuid(),
    exercises: z.array(createExerciseSchema),
    exercisesOrder: z.array(z.string().trim().uuid()).default([]),
    memberId: z.string().trim().uuid().or(z.undefined()).optional(),
    name: z.string().trim().min(1).max(255),
    notes: z.string().trim().max(255).or(z.undefined()).optional(),
    trainerId: z.string().trim().uuid()
})

export type CreateWorkoutFormInput = z.infer<typeof createWorkoutSchema>;

export const useCreateWorkoutForm = (options?: UseFormProps<CreateWorkoutFormInput>) => {
    const form = useForm<CreateWorkoutFormInput>({
        resolver: zodResolver(createWorkoutSchema)
    });
    return form;
}