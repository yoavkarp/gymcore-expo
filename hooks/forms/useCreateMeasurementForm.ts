import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    fat: z.preprocess(i => Number(i) || undefined, z.number().min(1).max(100).optional()),
    weight: z.preprocess(i => Number(i) || undefined, z.number().min(1).optional()),
    height: z.preprocess(i => Number(i) || undefined, z.number().min(1).max(400).optional()),
    heart_rate: z.preprocess(i => Number(i) || undefined, z.number().min(1).max(300).optional()),
}).refine((data) => {
    // Check that at least one property is present (not undefined or null)
    return Object.values(data).some(value => value !== undefined && value !== null);
}, {
    message: "יש למלא לפחות ערך אחד"
});


export type CreateMeasurementFormValues = z.infer<typeof schema>

export const useCreateMeasurementForm = (props?: UseFormProps<CreateMeasurementFormValues>) => useForm<CreateMeasurementFormValues>({
    resolver: zodResolver(schema),
    ...props
})