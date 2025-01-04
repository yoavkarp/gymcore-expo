import { createContext, PropsWithChildren, useState } from "react";
import { useContext } from "react";
import { CreateTrainerInput, GetClubTrainersDocument, GetClubTrainersQuery, GetClubTrainersQueryVariables, Tenant, Trainer, useCreateTrainerMutation, useGetClubTrainersQuery } from "@/graphql";
import { ApolloError, NetworkStatus } from "@apollo/client";
import { useSession } from "@/features/auth";

type ClubContextValue = {
    currentTrainer: Partial<Trainer> | null;
    trainers: Partial<Trainer>[];
    isLoading: boolean;
    tenant: Tenant | null;
    clubId: string | null;
    setCurrentTrainer: (trainerId: string) => void;
    createTrainer: (trainer: CreateTrainerInput) => void;
    deleteTrainer: (trainerId: string) => void;
    setIsCreateTrainerModalVisible: (visible: boolean) => void;
    setIsTrainersListVisible: (visible: boolean) => void;

    isCreateTrainerModalVisible: boolean;
    isTrainersListVisible: boolean;
    createTrainerError?: ApolloError;
    clubTrainersData?: GetClubTrainersQuery;
}

const ClubContext = createContext<ClubContextValue | null>(null);

ClubContext.displayName = "ClubContext";

type ClubProviderProps = {

}

export function ClubProvider({ children }: PropsWithChildren<ClubProviderProps>) {

    const [currentTrainerId, setCurrentTrainerId] = useState<string | null>(null);
    const [tenant, setTenant] = useState<Tenant | null>(null);
    const [isCreateTrainerModalVisible, setIsCreateTrainerModalVisible] = useState(false);
    const [isTrainersListVisible, setIsTrainersListVisible] = useState(true);
    const { session } = useSession();

    const { loading: loadingClubTrainers, data: clubTrainersData, error, refetch, networkStatus } = useGetClubTrainersQuery({
        onCompleted(data) {
            setCurrentTrainerId(data?.getClubTrainers?.[0]?.id || null);
        },
        onError(err) {
            console.log(err)
        },
        nextFetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true
    });

    const currentTrainer = clubTrainersData?.getClubTrainers?.find((trainer) => trainer.id === currentTrainerId) || null;

    const setCurrentTrainer = (trainerId: string) => {
        setCurrentTrainerId(trainerId);
    }

    const [createTrainer, { error: createTrainerError }] = useCreateTrainerMutation({
        update(cache, { data }) {
            const existingList = cache.readQuery<GetClubTrainersQuery, GetClubTrainersQueryVariables>({ query: GetClubTrainersDocument });
            if (existingList && existingList.getClubTrainers && data?.createTrainer) {
                cache.writeQuery<GetClubTrainersQuery>({
                    query: GetClubTrainersDocument,
                    data: {
                        getClubTrainers: [data.createTrainer, ...existingList.getClubTrainers]
                    },
                });
            }
        },
        onCompleted(data) {
            setCurrentTrainerId(data.createTrainer?.id || null)
        }
    });

    const isLoading = loadingClubTrainers || networkStatus === NetworkStatus.refetch;


    return (
        <ClubContext.Provider value={{
            clubId: session?.getIdToken().decodePayload().sub,
            isLoading,
            currentTrainer,
            trainers: clubTrainersData?.getClubTrainers || [],
            tenant,
            setCurrentTrainer,
            createTrainer: (input) => createTrainer({ variables: { input }, onCompleted() { setIsCreateTrainerModalVisible(false); } }),
            deleteTrainer: () => null,
            setIsCreateTrainerModalVisible,
            setIsTrainersListVisible,
            isCreateTrainerModalVisible,
            isTrainersListVisible,
            createTrainerError,
            clubTrainersData
        }}
        >
            {children}
        </ClubContext.Provider>
    )
};

export function useClub() {
    const value = useContext(ClubContext);

    if (!value) {
        throw new Error('useClub must be wrapped in a <ClubProvider />');
    }

    return value;
}


export default ClubProvider