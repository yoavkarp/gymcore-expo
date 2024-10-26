import { getMemberById } from "@/features/appsync/queries";
import { useClub } from "@/features/club";
import { CreatePlanInput, CreatePlanMutation, CreatePlanMutationVariables, GetMemberByIdDocument, GetMemberByIdQuery, GetMemberByIdQueryVariables, useCreatePlanMutation } from "@/graphql";
import { MutationHookOptions } from "@apollo/client";

export function useCreatePlan(options?: MutationHookOptions<CreatePlanMutation, CreatePlanMutationVariables>) {
    const { currentTrainer } = useClub()
    const [createPlan, result] = useCreatePlanMutation({
        ...options,
        update(cache, { data }, opts) {
            const existingItems = cache.read<GetMemberByIdQuery, GetMemberByIdQueryVariables>({
                query: GetMemberByIdDocument,
                variables: { id: opts.variables?.input.memberId! },
                optimistic: true
            })

            if (existingItems?.getMemberById)
                cache.writeQuery<GetMemberByIdQuery, GetMemberByIdQueryVariables>({
                    query: GetMemberByIdDocument,
                    variables: { id: opts.variables?.input.memberId! },
                    data: {
                        getMemberById: {
                            ...existingItems.getMemberById!,
                            plans: {
                                ...existingItems.getMemberById.plans,
                                items: [...(existingItems?.getMemberById.plans?.items || []), data?.createPlan!],
                            }
                        }
                    }
                });
        }
    });

    return {
        createPlan: (args: CreatePlanInput) => {
            return createPlan({ variables: { trainerId: currentTrainer?.id!, input: args } });
        },
        result
    }
}
