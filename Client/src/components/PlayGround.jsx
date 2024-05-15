import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { Button } from "@/components/ui/button";
import RubikCube2 from "./RubikCube2";
import useMoves from "../store/useMoves.js";
import useClue from "../store/useClue.js";
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
  const [trigger, setTrigger] = useState("");
  const { setMovimientos } = useMoves();
  const { setClue } = useClue();
  const pista = () => {
    let valorExistente = localStorage.getItem("cadenaRubik");
    if (valorExistente != null) {
      let resultado = valorExistente.split("").reverse().join("")[0];
      if (resultado === resultado.toLowerCase()) {
        resultado = resultado.toUpperCase();
      } else {
        resultado = resultado.toLowerCase();
      }
      document.getElementById(resultado).classList.add("bg-[#90C290]");
      setClue(valorExistente.split("").reverse().join("")[0]);
    }
  };
  const llamarFuncionDelHijo = (funcion) => {
    let valorExistente = localStorage.getItem("cadenaRubik");
    if (valorExistente != null) {
      localStorage.setItem("cadenaRubik", valorExistente + funcion[0]);
    } else {
      localStorage.setItem("cadenaRubik", funcion[0]);
    }

    setMovimientos(funcion); // Cambia el estado del store
  };
  // const ref = useRef();
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
                    onClick={() => pista()}
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
                        {/* <RubikCube2 ref={ref} /> */}
                        <BotonGrande
                          id="B"
                          text="B"
                          onClick={() => {
                            if (
                              document
                                .getElementById("B")
                                .classList.contains("bg-[#90C290]")
                            ) {
                              document
                                .getElementById("B")
                                .classList.remove("bg-[#90C290]");
                            }
                            llamarFuncionDelHijo("B" + Date.now());
                          }}
                        />

                        <BotonGrande
                          id="U"
                          text="U"
                          onClick={() => {
                            if (
                              document
                                .getElementById("U")
                                .classList.contains("bg-[#90C290]")
                            ) {
                              document
                                .getElementById("U")
                                .classList.remove("bg-[#90C290]");
                            }
                            llamarFuncionDelHijo("U" + Date.now());
                          }}
                        />

                        <BotonGrande
                          id="D"
                          text="D"
                          onClick={() => {
                            if (
                              document
                                .getElementById("D")
                                .classList.contains("bg-[#90C290]")
                            ) {
                              document
                                .getElementById("D")
                                .classList.remove("bg-[#90C290]");
                            }
                            llamarFuncionDelHijo("D" + Date.now());
                          }}
                        />

                        <BotonGrande
                          id="L"
                          text="L"
                          onClick={() => {
                            if (
                              document
                                .getElementById("L")
                                .classList.contains("bg-[#90C290]")
                            ) {
                              document
                                .getElementById("L")
                                .classList.remove("bg-[#90C290]");
                            }
                            llamarFuncionDelHijo("L" + Date.now());
                          }}
                        />

                        <BotonGrande
                          id="R"
                          text="R"
                          onClick={() => {
                            if (
                              document
                                .getElementById("R")
                                .classList.contains("bg-[#90C290]")
                            ) {
                              document
                                .getElementById("R")
                                .classList.remove("bg-[#90C290]");
                            }
                            llamarFuncionDelHijo("R" + Date.now());
                          }}
                        />

                        <BotonGrande
                          id="F"
                          text="F"
                          onClick={() => {
                            if (
                              document
                                .getElementById("F")
                                .classList.contains("bg-[#90C290]")
                            ) {
                              document
                                .getElementById("F")
                                .classList.remove("bg-[#90C290]");
                            }
                            llamarFuncionDelHijo("F" + Date.now());
                          }}
                        />
                      </div>
                      <div className="flex flex-row items-end absolute right-[130px] bottom-4  gap-3 text-black text-4xl font-extrabold">
                      <BotonGrande
                          id="b"
                          text="B'"
                          onClick={() => {
                            if (
                              document
                                .getElementById("b")
                                .classList.contains("bg-[#90C290]")
                            ) {
                              document
                                .getElementById("b")
                                .classList.remove("bg-[#90C290]");
                            }
                            llamarFuncionDelHijo("b" + Date.now());
                          }}
                        />
                        <BotonGrande
                          id="u"
                          text="U'"
                          onClick={() => {
                            if (
                              document
                                .getElementById("u")
                                .classList.contains("bg-[#90C290]")
                            ) {
                              document
                                .getElementById("u")
                                .classList.remove("bg-[#90C290]");
                            }
                            llamarFuncionDelHijo("u" + Date.now());
                          }}
                        />

                        <BotonGrande
                          id="d"
                          text="D'"
                          onClick={() => {
                            if (
                              document
                                .getElementById("d")
                                .classList.contains("bg-[#90C290]")
                            ) {
                              document
                                .getElementById("d")
                                .classList.remove("bg-[#90C290]");
                            }
                            llamarFuncionDelHijo("d" + Date.now());
                          }}
                        />

                        <BotonGrande
                          id="l"
                          text="L'"
                          onClick={() => {
                            if (
                              document
                                .getElementById("l")
                                .classList.contains("bg-[#90C290]")
                            ) {
                              document
                                .getElementById("l")
                                .classList.remove("bg-[#90C290]");
                            }
                            llamarFuncionDelHijo("l" + Date.now());
                          }}
                        />

                        <BotonGrande
                          id="r"
                          text="R'"
                          onClick={() => {
                            if (
                              document
                                .getElementById("r")
                                .classList.contains("bg-[#90C290]")
                            ) {
                              document
                                .getElementById("r")
                                .classList.remove("bg-[#90C290]");
                            }
                            llamarFuncionDelHijo("r" + Date.now());
                          }}
                        />

                        <BotonGrande
                          id="f"
                          text="F'"
                          onClick={() => {
                            if (
                              document
                                .getElementById("f")
                                .classList.contains("bg-[#90C290]")
                            ) {
                              document
                                .getElementById("f")
                                .classList.remove("bg-[#90C290]");
                            }
                            llamarFuncionDelHijo("f" + Date.now());
                          }}
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
