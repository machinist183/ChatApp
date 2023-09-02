import LandingHeader from "../componets/LandingHeader";
import Lottie from 'lottie-react';
import { Outlet } from "react-router-dom";
import { useRef } from "react";
import  networkLottieData from '../assets/lotties/networkLottie.json'

export default function Landing(){
    const networkLottie = useRef(null)
    return(
        <div className="relative h-[100vh] bg-gradient-to-t from-[#948E99] to-[#2E1437] overflow-hidden">  
            <LandingHeader/>
            <div className=" flex text-white my-auto flex-col flex-wrap min-w-[50%] w-1/2 m-auto
                             absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2">
                <h1 className="text-center border-4 ">
                    Hey Wanderer ...
                </h1>
                <p className="border-4 ">
                    Looks like you have finally found your destination . Why dont you 
                    relax in one of our rooms ? We offer great coffee and a channel 
                    every thought.Oops , I forgot to mention , we have lots of wanderers like you .
                </p>
            </div>
            <Lottie className="h-80 w-80"
                    lottieRef={networkLottie}
                    animationData={networkLottieData}
                    height={40}
                    width={40}
            />

        </div>
    )
}