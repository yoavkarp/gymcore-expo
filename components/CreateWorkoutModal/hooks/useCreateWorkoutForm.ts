import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";

export const createWorkoutSchema = z.object({
    name: z.string().trim().min(1).max(255),
})

export type CreateWorkoutFormInput = z.infer<typeof createWorkoutSchema>;

export const useCreateWorkoutForm = (options?: UseFormProps<CreateWorkoutFormInput>) => {
    const form = useForm<CreateWorkoutFormInput>({
        resolver: zodResolver(createWorkoutSchema),
        ...options
    });
    return form;
}