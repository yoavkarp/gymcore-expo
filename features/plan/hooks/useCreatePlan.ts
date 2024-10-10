import { useClub } from "@/features/club";
import { CreatePlanInput, CreatePlanMutation, CreatePlanMutationVariables, useCreatePlanMutation } from "@/graphql";
import { MutationHookOptions } from "@apollo/client";

export function useCreatePlan(options?: MutationHookOptions<CreatePlanMutation, CreatePlanMutationVariables>) {
    const { currentTrainer } = useClub()
    const [createPlan, result] = useCreatePlanMutation({
        ...options,
        update(cache, { data }, opts) {

        }
    });

    return {
        createPlan: (args: CreatePlanInput) => {
            return createPlan({ variables: { trainerId: currentTrainer?.id!, input: args } });
        },
        result
    }
}
