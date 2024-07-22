type UserStakingInfo = {
    claimableTokens: number;
    lastUpdate: number;
    stakingDuration: number;
    stakingPool: StakingPool;
    stakingStartDate: number;
    totalStaked: number;
    userId: string;
    walletAddress: string;
};


interface IUnstakingProps {
    handleUnstake:  () => Promise<false | undefined>;
    stakingData:  UserStakingInfo | null;
    amountUnstake: number;
    setAmountUnstake: Dispatch<SetStateAction<number>>
     fetchingStakingData: boolean;
}

interface IStakingProps {
    handleStake:  () => Promise<void>;
    stakingData:  UserStakingInfo | null;
    amountUnstake: number;
    setAmountUnstake: Dispatch<SetStateAction<number>>
     fetchingStakingData: boolean;
    //  amountIn, setAmountIn, 
}