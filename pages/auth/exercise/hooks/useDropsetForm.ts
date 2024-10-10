import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";
import { parameterInputSchema } from "./useParameterForm";
import { zodResolver } from "@hookform/resolvers/zod";

export const dropSetSchema = z.object({
    id: z.string().optional().nullable(),
    reps: z.preprocess((val) => ['undefined', 'null'].includes(typeof (val)) ? undefined : Object.keys(val as any).length === 0 ? undefined : val, parameterInputSchema.nullable().optional()),
    // times: z.number().optional(),
    weight: z.preprocess((val) => ['undefined', 'null'].includes(typeof (val)) ? undefined : Object.keys(val as any).length === 0 ? undefined : val, parameterInputSchema.nullable().optional()),
})
    .refine(data => {
        if (Object.keys(data).filter(d => data[d as keyof typeof data] && d !== 'times').length === 0) {
            return false;
        }
        return true
    }, { message: "אתה חייב להגדיר לפחות פרמטר אחד" })


export type DropSetFormInput = z.infer<typeof dropSetSchema>;

export const useDropSetForm = (options?: UseFormProps<DropSetFormInput>) => {
    const form = useForm<DropSetFormInput>({
        resolver: zodResolver(dropSetSchema),
        ...options
    });
    return form;
}