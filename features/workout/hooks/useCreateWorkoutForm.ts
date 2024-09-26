import { CreateWorkoutInput } from "@/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";
import { createExerciseSchema } from "./useCreateExerciseForm";

export const createWorkoutSchema = z.object({
    exercises: z.array(createExerciseSchema).default([]),
    name: z.string().trim().min(1).max(255),
    notes: z.string().trim().max(255).or(z.undefined()).optional(),
})

export type CreateWorkoutFormInput = z.infer<typeof createWorkoutSchema>;

export const useCreateWorkoutForm = (options?: UseFormProps<CreateWorkoutFormInput>) => {
    const form = useForm<CreateWorkoutFormInput>({
        resolver: zodResolver(createWorkoutSchema),
        ...options
    });
    return form;
}