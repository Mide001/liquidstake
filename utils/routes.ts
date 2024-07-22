import { ENDPOINT } from "./constants";


export const fetcher = (...args) => fetch(...args).then(res => res.json())


export const APIRoutes = {
    GET_USER_INFO: (walletAddress: any) => `${ENDPOINT}/reward-info/${walletAddress}`,
    GET_USER: (walletAddress: any) => `${ENDPOINT}/user/${walletAddress}`,

   
}