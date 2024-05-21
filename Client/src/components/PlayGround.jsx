// En esta parte se importan los archivos necesarios para el correcto funcionamiento del componente.
// Los import que tienen como carpeta madre @/components son los componentes de shadcn/ui
// Los import que tienen como carpeta madre ../store son los estados globales de Zustand
// Los import que que tienen como carpeta madre ./ son los componentes de react de la aplicación
import React from "react";
import { Button } from "@/components/ui/button";
import RubikCube from "./RubikCube";
import useMoves from "../store/useMoves.js";
import useRandom from "../store/useRandom.js";
import useClue from "../store/useClue.js";
import useAnimate from "../store/useAnimate.js";
import Logo from "./Logo";
import BotonGrande from "./BotonGrande";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Toaster } from "@/components/ui/toaster";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useSolve from "../store/useSolve.js";

// Se inicializa el componente react.
const PlayGround = () => {
  // Se declaran los estados generales de Zustand
  const { animate, setAnimate } = useAnimate();
  const { setMovimientos } = useMoves();
  const { random, setRandom } = useRandom();
  const { solve, setSolve } = useSolve();
  const [open, setOpen] = React.useState(false);
  const { setClue } = useClue();
  const { toast } = useToast();
  // Funcion que actualiza el estado para que comience a resolverse el cubo
  const solveFun = () => {
    setSolve(true);
  };
  // Funcion que actualiza el estado para que comience a resolverse el cubo pero solo retorna un movimiento
  const pista = () => {
    setClue(true);
    setSolve(true);
  };
  const llamarFuncionDelHijo = (funcion) => {
    // Se comprueba que no esté en marcha ningun movimiento
    if (!random && !solve && !animate) {
      let valorExistente = localStorage.getItem("cadenaRubik");

      if (valorExistente != null) {
        // Si ya existen movimientos en el localStorage se añade a los existentes
        localStorage.setItem("cadenaRubik", valorExistente + funcion[0]);
      } else {
        // Si no existen movimientos previos se añade directamente
        localStorage.setItem("cadenaRubik", funcion[0]);
      }

      setMovimientos(funcion); // Cambia el estado del store
    }
  };
  const nuevoCubo = () => {
    // Recarga el componente
    window.location.reload(false);
  };
  const randomize = () => {
    let valorExistente = localStorage.getItem("cadenaRubik");
    if (valorExistente == null) {
      setRandom(true); // Cambia el estado del store
    } else {
      // Si ya hay movimientos realizados alerto al usuario de que debe crear un cubo nuevo
      toast({
        title: "Error",
        description:
          "Para randomizar el cubo este ha de ser nuevo. Crea un cubo nuevo en el botón con el +",
      });
    }
  };
  return (
    <>
      <div className="grid grid-cols-5 grid-rows-8 gap-0 h-screen font-sans">
        <div className="row-span-8 bg-[#E0E5E7] flex flex-col justify-between">
          <Logo></Logo>
          <div className="pl-5 pb-5">
            {/* El tooltip es un mensaje que sale encima indicando para que sirve el boton */}
            <TooltipProvider delayDuration={0}>
              <div className="flex flex-col gap-3 items-start">
                <Tooltip>
                  <TooltipTrigger>
                    <BotonGrande
                      img={
                        <img
                          srcSet="./src/assets/plus-solid.svg"
                          className="w-[40px]"
                          alt="Cruz"
                        />
                      }
                      onClick={() => nuevoCubo()}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Create cube</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <BotonGrande
                      img={
                        <img
                          srcSet="./src/assets/shuffle-solid.svg"
                          className="w-[40px]"
                          alt="Randomizar"
                        />
                      }
                      onClick={() => randomize()}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Randomize</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    {/* El dialog sirve para mostrar un mensaje en medio y opacar el fondo */}
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger>
                        <BotonGrande
                          img={
                            <img
                              srcSet="./src/assets/pista.svg"
                              className="w-[40px]"
                              alt="Pista"
                            />
                          }
                        />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Have you asked for help?</DialogTitle>
                          <DialogDescription>
                            If you want just to know the next move press the
                            next move button. If you want us to solve the cube
                            press the solve button.
                          </DialogDescription>
                        </DialogHeader>
                        <Button
                          onClick={() => {
                            setOpen(false);
                            pista();
                          }}
                        >
                          Next move
                        </Button>
                        <Button
                          onClick={() => {
                            setOpen(false);
                            solveFun();
                          }}
                        >
                          Solve
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Clue</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
        </div>
        <div className="col-span-4 row-span-2 col-start-2 row-start-7 bg-[#E0E5E7] flex flex-row justify-end items-end">
          <div className="pr-5 pb-5">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  {/* El collapsible sirve para ocultar/mostrar los botones de los movimientos 
                      cuando se acciona el boton Moves
                  */}
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
                        {/* Todos los movimientos que puede realizar el cubo, el Date.now() lo añado para que se pueda
                            llamar varias veces al mismo movimiento. Ya que nunca es igual.
                         */}
                        <BotonGrande
                          id="B"
                          text="B"
                          onClick={() => {
                            llamarFuncionDelHijo("B" + Date.now());
                          }}
                        />

                        <BotonGrande
                          id="U"
                          text="U"
                          onClick={() => {
                            llamarFuncionDelHijo("U" + Date.now());
                          }}
                        />

                        <BotonGrande
                          id="D"
                          text="D"
                          onClick={() => {
                            llamarFuncionDelHijo("D" + Date.now());
                          }}
                        />

                        <BotonGrande
                          id="L"
                          text="L"
                          onClick={() => {
                            llamarFuncionDelHijo("L" + Date.now());
                          }}
                        />

                        <BotonGrande
                          id="R"
                          text="R"
                          onClick={() => {
                            llamarFuncionDelHijo("R" + Date.now());
                          }}
                        />

                        <BotonGrande
                          id="F"
                          text="F"
                          onClick={() => {
                            llamarFuncionDelHijo("F" + Date.now());
                          }}
                        />
                      </div>
                      <div className="flex flex-row items-end absolute right-[130px] bottom-4  gap-3 text-black text-4xl font-extrabold">
                        <BotonGrande
                          id="b"
                          text="B'"
                          onClick={() => {
                            llamarFuncionDelHijo("b" + Date.now());
                          }}
                        />
                        <BotonGrande
                          id="u"
                          text="U'"
                          onClick={() => {
                            llamarFuncionDelHijo("u" + Date.now());
                          }}
                        />

                        <BotonGrande
                          id="d"
                          text="D'"
                          onClick={() => {
                            llamarFuncionDelHijo("d" + Date.now());
                          }}
                        />

                        <BotonGrande
                          id="l"
                          text="L'"
                          onClick={() => {
                            llamarFuncionDelHijo("l" + Date.now());
                          }}
                        />

                        <BotonGrande
                          id="r"
                          text="R'"
                          onClick={() => {
                            llamarFuncionDelHijo("r" + Date.now());
                          }}
                        />

                        <BotonGrande
                          id="f"
                          text="F'"
                          onClick={() => {
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
          <RubikCube />
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default PlayGround;
