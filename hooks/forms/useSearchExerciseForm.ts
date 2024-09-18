import { useForm, UseFormProps } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateMemberInput, Gender } from '@/appsync/API';

export const searchExerciseFormSchema = z.object({
    text: z.string().min(4, { message: "יש להקליד לפחות 4 תווים" })
})

export type SearchExerciseFormValues = z.infer<typeof searchExerciseFormSchema>

export const useSearchExerciseForm = (props?: UseFormProps<SearchExerciseFormValues>) => useForm<SearchExerciseFormValues>({
    resolver: props?.resolver || zodResolver(searchExerciseFormSchema),
    ...props
})