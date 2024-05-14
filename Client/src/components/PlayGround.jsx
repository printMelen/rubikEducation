import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import RubikCube2 from "./RubikCube2";
import Logo from "./Logo";
import BotonGrande from "./BotonGrande";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const PlayGround = () => {
  const [isOpenM, setIsOpenM] = useState(false);
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
                  <Collapsible>
                    <CollapsibleTrigger>
                      <BotonGrande
                        img={
                          <img
                            srcSet="./src/assets/moves.svg"
                            className="w-[50px]"
                            alt="Moves"
                          />
                        }
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="flex flex-col justify-between absolute bottom-[130px] w-5 gap-3 text-black text-4xl font-extrabold">
                        <BotonGrande
                          text="B"
                          onClick={() => llamarFuncionDelHijo("funcionB")}
                        />

                        <BotonGrande
                          text="U"
                          onClick={() => llamarFuncionDelHijo("funcionU")}
                        />

                        <BotonGrande
                          text="D"
                          onClick={() => llamarFuncionDelHijo("funcionD")}
                        />

                        <BotonGrande
                          text="L"
                          onClick={() => llamarFuncionDelHijo("funcionL")}
                        />

                        <BotonGrande
                          text="R"
                          onClick={() => llamarFuncionDelHijo("funcionR")}
                        />

                        <BotonGrande
                          text="F"
                          onClick={() => llamarFuncionDelHijo("funcionF")}
                        />
                      </div>
                      <div className="flex flex-row items-end absolute right-[130px] bottom-4  gap-3 text-black text-4xl font-extrabold">
                        <BotonGrande
                          text="B'"
                          onClick={() => llamarFuncionDelHijo("funcionBprima")}
                        />
                        <BotonGrande
                          text="U'"
                          onClick={() => llamarFuncionDelHijo("funcionUprima")}
                        />
                        <BotonGrande
                          text="D'"
                          onClick={() => llamarFuncionDelHijo("funcionDprima")}
                        />
                        <BotonGrande
                          text="L'"
                          onClick={() => llamarFuncionDelHijo("funcionLprima")}
                        />
                        <BotonGrande
                          text="R'"
                          onClick={() => llamarFuncionDelHijo("funcionRprima")}
                        />
                        <BotonGrande
                          text="F'"
                          onClick={() => llamarFuncionDelHijo("funcionFprima")}
                        />
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
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
          <RubikCube2 />
        </div>
      </div>
    </>
  );
};

export default PlayGround;
