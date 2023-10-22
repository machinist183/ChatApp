import Lottie from 'lottie-react';
import { useRef , useState , useEffect } from "react";
import  networkLottieData from '../assets/lotties/networkLottie.json'
import { NavLink } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import flyingBird from '../assets/siteImages/flyingBird.gif'


export default function Landing(){
    const networkLottie = useRef(null)

    return(
        <div className="flex flex-row h-[100vh] justify-evenly items-center  overflow-hidden">
            <Lottie className="h-[40rem] w-[40rem] 
                               "
                    lottieRef={networkLottie}
                    animationData={networkLottieData}
              
            />
            <div className=" flex my-auto flex-col flex-wrap min-w-[60%] w-1/2 ">
                            
                <h1 className="text-start font-black text-8xl">
                    Hey Wanderer ...
                </h1>
                <p className="mt-8 font-mono font-semibold text-lg text-center leading-relaxed capitalize antialiased">
                    Looks like you have finally found your destination . Why dont you 
                    relax in one of our rooms ? We offer great coffee and a channel for 
                    every thought.Oops , I forgot to mention , we have lots of wanderers like you .
                </p>
                <div className="flex flex-row justify-evenly mt-8 ">
                    <NavLink to="register" className='w-[40%]  h-14'>
                        <Button variant='solid'  className='w-full h-full font-semibold text-lg
                                                           shadow-button hover:shadow-button-hover
                                                           hover:text-quarternery hover:bg-primary
                                                           dark:hover:text-darkQuarternery dark:hover:bg-darkPrimary
                                                           font-serif text-inherit bg-quarternery dark:bg-darkQuarternery'>
                            Join The Wonderland
                        </Button>
                    </NavLink>
                    <NavLink to="login" className='w-[40%]  h-14'>
                        <Button variant='solid' className='w-full h-full font-semibold text-lg
                                                           shadow-button hover:shadow-button-hover
                                                           dark:hover:text-darkQuarternery dark:hover:bg-darkPrimary
                                                           font-serif text-inherit bg-quarternery dark:bg-darkQuarternery'>
                            Enter The Wonderland
                        </Button>
                    </NavLink>
                </div>
            </div>
            {/* <img src={flyingBird} alt="load to hus"/> */}
          

        </div>
    )
}