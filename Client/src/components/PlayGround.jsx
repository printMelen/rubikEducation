import React from "react";
import { Button } from "@/components/ui/button";
import RubikCube from "./RubikCube";
import Logo from "./Logo";
import BotonGrande from "./BotonGrande";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PlayGround = () => {
  return (
    <>
      <div className="grid grid-cols-5 grid-rows-8 gap-0 h-screen font-sans">
        <div className="row-span-8 bg-[#E0E5E7] flex flex-col justify-between">
          <Logo></Logo>
          <div className="pl-5 pb-5">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <BotonGrande
                    img={
                      <img
                        srcSet="./src/assets/pista.svg"
                        className="w-[40px]"
                        alt="Eliminar"
                      />
                    }
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clue</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="col-span-4 row-span-2 col-start-2 row-start-7 bg-[#E0E5E7] flex flex-row justify-end items-end">
          <div className="pr-5 pb-5">
          <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
            <BotonGrande
              img={
                <img
                  srcSet="./src/assets/moves.svg"
                  className="w-[50px]"
                  alt="Eliminar"
                />
              }
            />
            </TooltipTrigger>
                <TooltipContent>
                  <p>Moves</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="row-span-6 col-start-5 row-start-1 bg-[#E0E5E7]"></div>
        <div
          id="cube"
          className="col-span-3 row-span-6 col-start-2 row-start-1 bg-[#E0E5E7] border-black border-[2px]"
        >
          <RubikCube />
        </div>
      </div>
    </>
  );
};

export default PlayGround;
