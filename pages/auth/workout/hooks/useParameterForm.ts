import { UseFormProps, useForm } from "react-hook-form";
import { z } from "zod";

export const parameterInputSchema = z.object({
    max: z.number().or(z.null()).optional(),
    unit: z.string().trim().max(255).or(z.null()).optional(),
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

export type ParameterInput = z.infer<typeof parameterInputSchema>;

export const useParameterForm = (options?: UseFormProps<ParameterInput>) => {
    const form = useForm<ParameterInput>(options);
    return form;
}