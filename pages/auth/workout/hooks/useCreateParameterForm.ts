import { UseFormProps, useForm } from "react-hook-form";
import { z } from "zod";

export const createParameterInputSchema = z.object({
    max: z.number().or(z.null()).optional(),
    unit: z.string().trim().max(255).optional(),
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

export type CreateParameterInput = z.infer<typeof createParameterInputSchema>;

export const useCreateParameterForm = (options?: UseFormProps<CreateParameterInput>) => {
    const form = useForm<CreateParameterInput>(options);
    return form;
}