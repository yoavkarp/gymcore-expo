import { createContext, PropsWithChildren, useState } from "react";
import { useContext } from "react";
import { CreateTrainerInput, Gender, GetClubTrainersDocument, GetClubTrainersQuery, GetClubTrainersQueryResult, GetClubTrainersQueryVariables, Tenant, Trainer, useCreateTrainerMutation, useGetClubTrainersQuery } from "@/graphql";
import { NetworkStatus } from "@apollo/client";
import Modal from "@/components/ui/Modal";
import Text from "@/components/ui/Text";
import CreateTrainerModal from "@/components/CreateTrainerModal";
import TrainerList from "@/components/TrainerList";
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
            createTrainer: (input) => createTrainer({ variables: { input } }),
            deleteTrainer: () => null,
            setIsCreateTrainerModalVisible,
            setIsTrainersListVisible
        }}
        >
            {children}
            <CreateTrainerModal
                onDismiss={() => setIsCreateTrainerModalVisible(false)}
                visible={!isLoading && (isCreateTrainerModalVisible || (clubTrainersData?.getClubTrainers || []).length === 0)}
                onSubmit={(input) => createTrainer({ variables: { input: { ...input, gender: input.gender as Gender, phone_number: `+972${input.phone_number}` } }, onCompleted() { setIsCreateTrainerModalVisible(false) } })}
                error={createTrainerError}
            />
            <Modal visible={isTrainersListVisible} dismissable>
                <TrainerList
                    trainers={clubTrainersData?.getClubTrainers || []}
                    onPressNewTrainer={() => setIsCreateTrainerModalVisible(true)}
                    onPressTrainer={(trainerId) => {
                        setCurrentTrainer(trainerId)
                        setIsTrainersListVisible(false);
                    }}
                    currentTrainerId={currentTrainerId || undefined}
                />
            </Modal>
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