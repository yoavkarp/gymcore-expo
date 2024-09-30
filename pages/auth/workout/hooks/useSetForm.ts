import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";
import { parameterInputSchema } from "./useParameterForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { dropSetSchema } from "./useDropsetForm";

export const setSchema = z.object({
    reps: z.preprocess((val) => ['undefined', 'null'].includes(typeof (val)) ? undefined : Object.keys(val as any).length === 0 ? undefined : val, parameterInputSchema.optional()),
    rest: z.preprocess((val) => ['undefined', 'null'].includes(typeof (val)) ? undefined : Object.keys(val as any).length === 0 ? undefined : val, parameterInputSchema.optional()),
    weight: z.preprocess((val) => ['undefined', 'null'].includes(typeof (val)) ? undefined : Object.keys(val as any).length === 0 ? undefined : val, parameterInputSchema.optional()),
    times: z.number().min(1).int().optional(),
    dropsets: z.array(dropSetSchema).optional()
})
    .refine(data => {
        if (Object.keys(data).filter(d => data[d as keyof typeof data] && d !== 'times').length === 0) {
            return false;
        }
        return true
    }, { message: "אתה חייב להגדיר לפחות פרמטר אחד" })


export type SetFormInput = z.infer<typeof setSchema>;

export const useCreateSetForm = (options?: UseFormProps<SetFormInput>) => {
    const form = useForm<SetFormInput>({
        resolver: zodResolver(setSchema),
        ...options
    });
    return form;
}