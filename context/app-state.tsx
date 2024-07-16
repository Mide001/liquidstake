"use client"

import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { ENDPOINT } from '../utils/constants';
type RewardInfo = {
  balance: number;
  totalStakers: number;
  userStakedAmount: number;
  userReward: number;
} | null;
interface IAppContext {
  currentMode: string;
  rewardInfo: RewardInfo;
  setCurrentMode: React.Dispatch<React.SetStateAction<string>>;
  messageInfo: {
    messageText: string | null;
    messageType: string | null; // default to 'success', 'error', 'loading'
    isLoading: boolean;
    boxType: string;
  };
  setMessageInfo: React.Dispatch<React.SetStateAction<{
    messageText: string | null;
    messageType: string | null;
    isLoading: boolean;
    boxType: string;
  }>>;

}

const AppContext = createContext({} as IAppContext)

export const useAppContext = () => useContext(AppContext)

const AppProvider = ({ children }: PropsWithChildren) => {
  const [currentMode, setCurrentMode] = useState('staking')
  const [messageInfo, setMessageInfo] = useState({
    messageText: null,
    messageType: null, // default to 'success', 'error', 'loading'
    isLoading: false,
    boxType: 'transaction'
  });
  const [rewardInfo, setRewardInfo] = useState<RewardInfo>(null);

  const { connection } = useConnection()
  const { publicKey } = useWallet();
  const fetchRewardInfo = async () => {
    try {
      const response = await fetch(`${ENDPOINT}/reward-info/${publicKey}`);
      const data = await response.json();

      if (response.ok) {
        setRewardInfo(data);
        // calculateUserReward(data);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error fetching reward info:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentMode,
        setCurrentMode,
        messageInfo,
        setMessageInfo,
        // rewardInfo
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
