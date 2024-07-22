//@ts-ignore
"use client"
import { useState, useEffect, Dispatch, SetStateAction, useMemo } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
// import { PublicKey, Connection, LAMPORTS_PER_SOL, Transaction, SystemProgram } from "@solana/web3.js";
import { useGetAccountBalance } from '../../../hooks/useGetBalance';
import { useAppContext } from '../../../context/app-state';
import { Shell } from 'lucide-react';
import { ENDPOINT, formatBalance } from '../../../utils/constants';
import {format} from "date-fns"
import useSWR from 'swr'
import { APIRoutes, fetcher } from '../../../utils/routes';
type RewardInfo = {
    balance: number;
    totalStakers: number;
    userStakedAmount: number;
    userReward: number;
} | null;

const UnstakingForm = ({ handleUnstake, stakingData, amountUnstake, setAmountUnstake, fetchingStakingData }: IUnstakingProps) => {
  
    const { balance } = useGetAccountBalance()
    const { publicKey } = useWallet();
    const { connection } = useConnection()
    const { messageInfo, } = useAppContext()

    const fetchDataToggle = useMemo(() =>{
      if(connection && publicKey) return true
    }, [connection, publicKey])
    
   
    const {data, error, isLoading} = useSWR(fetchDataToggle ? APIRoutes.GET_USER_INFO(publicKey) : null, fetcher)
 
    const setMaxAmount = () => {
        setAmountUnstake(stakingData?.totalStaked);
    };
    return (
        <section className="py-8 space-y-6 border rounded-lg px-8 bg-white shadow-lg w-full max-w-[700px]">
        <h2 className="text-center text-black text-3xl pt-3 pb-5 font-bold">Unstake Your LQINV Tokens</h2>
      
        <div className="flex flex-col space-y-4 bg-gray-100 w-full py-4 px-4 rounded-md shadow-sm">
          <BalanceItem
            label="Staked Balance"
            value={fetchingStakingData && stakingData === null ? "fetching staked balance" : `${formatBalance(stakingData?.totalStaked)}`}
            loading={!publicKey || !connection}
          />
          <BalanceItem
            label="Unstaked Balance"
            value={`${formatBalance(balance)}`}
            loading={!publicKey || !connection}
          />
        {
            connection && publicKey && data && (
                <>
                  <BalanceItem
            label="Estimated Rewards"
            value={data ?  `${data?.userReward} Sol` : '0'}
            loading={!publicKey || !connection}
          />
           <BalanceItem
            label="Staking Start Date"
            value={data ?  `${format(data.stakingDate, "yyyy-MM-dd")}` : '0'}
            loading={!publicKey || !connection}
          />
                </>
            )
        }
        </div>
      
        <div className="rounded-md bg-gray-200 p-4 flex items-center justify-between border">
          <span className="text-gray-600 font-medium">LQINV</span>
          <div className="flex items-center w-full ml-2">
            <Input
              placeholder="0.00"
              value={amountUnstake}
              onChange={(e) => setAmountUnstake(e.target.value)}
              className="bg-transparent text-xl text-right border-none outline-none focus:ring-0 flex-1"
            />
            <Button
              className="ml-2 py-1 px-3 bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm rounded-md transition-all duration-300"
              onClick={setMaxAmount}
            >
              Max
            </Button>
          </div>
        </div>
      
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between">
            <h4 className="text-gray-500 font-medium">Minimum Staking Time:</h4>
            <p className="font-bold text-black text-lg md:text-xl">24 Hours</p>
          </div>
        </div>
      
        <Button
          className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-md shadow-md transition-all duration-300"
          onClick={handleUnstake}
          disabled={!publicKey || messageInfo.isLoading}
        >
          {messageInfo.isLoading && <Shell color="#00F5FF" className="animate-spin" />}
          Unstake Tokens
        </Button>
      </section>
    );
};

export default UnstakingForm;

interface IBalanceItem {
    label: string;
    value: string;
    loading: boolean;
}

const BalanceItem = ({ label, value, loading }: IBalanceItem) => (
    <div className="flex justify-between">
      <h3 className="text-gray-500 font-medium">{label}:</h3>
      {loading ? (
        <p className="font-bold text-black text-lg md:text-xl">0</p>
      ) : (
        <p className="font-bold text-black text-lg md:text-xl">{value}</p>
      )}
    </div>
  );