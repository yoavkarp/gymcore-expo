import { getMemberById } from "@/features/appsync/queries";
import { useClub } from "@/features/club";
import { CreatePlanInput, CreatePlanMutation, CreatePlanMutationVariables, useCreatePlanMutation } from "@/graphql";
import { MutationHookOptions } from "@apollo/client";

export function useCreatePlan(options?: MutationHookOptions<CreatePlanMutation, CreatePlanMutationVariables>) {
    const { currentTrainer } = useClub()
    const [createPlan, result] = useCreatePlanMutation({
        ...options,
        update(cache, { data }, opts) {
            // const q = cache.read({
            //     query: getMemberById,
            //     variables: { id: opts.variables?.input.memberId },
            //     optimistic: true
            // })
        }
    });

    return {
        createPlan: (args: CreatePlanInput) => {
            return createPlan({ variables: { trainerId: currentTrainer?.id!, input: args } });
        },
        result
    }
}
