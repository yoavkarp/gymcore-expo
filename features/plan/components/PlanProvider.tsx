import { createContext, PropsWithChildren, useEffect } from "react";
import { useContext } from "react";
import { Scalars, Plan, useGetPlanByIdLazyQuery, Exact, GetPlanByIdQuery } from "@/graphql";
import { QueryResult } from "@apollo/client";


type PlanContextValue = {
    query: QueryResult<GetPlanByIdQuery, Exact<{
        id: Scalars["ID"]["input"];
    }>>;
    plan?: Plan | null;
    planId: string;
};

const PlanContext = createContext<PlanContextValue | null>(null);

PlanContext.displayName = "PlanContext";

type PlanProviderProps = {
    planId: string;
}

export function PlanProvider({ children, planId }: PropsWithChildren<PlanProviderProps>) {

    const [getPlanById, result] = useGetPlanByIdLazyQuery({
        fetchPolicy: "network-only"
    });

    useEffect(() => {
        getPlanById({ variables: { id: planId } });
    }, [planId])

    return (
        <PlanContext.Provider value={{
            plan: result.data?.getPlanById as Plan,
            planId,
            query: result
        }}>
            {children}
        </PlanContext.Provider>
    )
};

export function usePlan() {
    const value = useContext(PlanContext);
    if (!value) {
        throw new Error("usePlan must be used within a PlanProvider");
    }
    return value;
}


export default PlanProvider