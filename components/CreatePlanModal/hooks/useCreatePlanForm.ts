import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";

export const createPlanSchema = z.object({
    meetings: z.number().int().positive().min(1),
    weeks: z.number().int().positive().min(1),
})

export type CreatePlanFormInput = z.infer<typeof createPlanSchema>;

export const useCreatePlanForm = (options?: UseFormProps<CreatePlanFormInput>) => {
    const form = useForm<CreatePlanFormInput>({
        resolver: zodResolver(createPlanSchema),
        ...options
    });
    return form;
}