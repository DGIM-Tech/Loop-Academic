import React, { useState } from 'react';
import { FaArrowLeft, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import ListaDeExerciciosItems from '../data/ListaDeExerciciosItens';

export function Exercicio() {
  const [showDicas, setShowDicas] = useState(false);
  const [showCodigoApoio, setShowCodigoApoio] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [code, setCode] = useState('');
  const [showSimplificarProblema, setShowSimplificarProblema] = useState(false);
  const [showSintaxe, setShowSintaxe] = useState(false);
  const [showDescricaoDetalhada, setShowDescricaoDetalhada] = useState(false);

  const navigate = useNavigate();

  const handleSelectExercise = (index) => {
    setSelectedIndex(index);
  };

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex < ListaDeExerciciosItems.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const selectedExercise = ListaDeExerciciosItems[selectedIndex];
  const lineCount = code.split('\n').length;

  const handleCloseModal = (setter) => () => {
    setter(false);
  };

  return (
    <div>
      <div>
        <div className='absolute top-[19px] left-[15px] text-[#0E7886] w-[135px] flex flex-col items-center'>
          <a href='/Listas-De-Exercicios-01' className='flex flex-col items-center'>
            <FaArrowLeft className='w-10 h-10' />
            <p>Retornar ao Início</p>
          </a>
        </div>

        <div className='absolute top-[115px] left-[61px]'>
          <div className='bg-[#FFFFFF] w-[1170px] h-[550px] flex shadow-md'>
            <div className='flex-grow p-5'>
              <div className='mb-5'>
                <h1 className='text-[#0E7886] text-2xl font-semibold mb-5'>
                  Exercício {selectedExercise.numero} - {selectedExercise.titulo}
                </h1>
                <p className='w-[585px]'>{selectedExercise.introducao}</p>
              </div>

              <div className='space-y-5'>
                <div className='mb-5'>
                  <h1 className='text-[#0E7886] text-2xl font-semibold mb-5'>
                    Precisa de Ajuda?
                  </h1>
                  <p className='w-[600px]'>
                    Consulte abaixo o conteúdo auxiliar preparado especialmente para você =]
                  </p>
                </div>

                <div className='space-x-6'>
                  <button
                    className='bg-[#0E7886] w-[170px] h-[41px] text-white'
                    onClick={() => setShowDicas(true)}
                  >
                    Dicas
                  </button>
                  <button
                    className='bg-[#0E7886] w-[170px] h-[41px] text-white'
                    onClick={() => setShowCodigoApoio(true)}
                  >
                    Código de Apoio
                  </button>
                  <button
                    className='bg-[#0E7886] w-[170px] h-[41px] text-white'
                    onClick={() => navigate('/Material-de-Apoio')}
                  >
                    Material de Apoio
                  </button>
                </div>
              </div>
            </div>

            <div className='relative flex h-[550px]'>
              {/* Line numbers */}
              <div className='bg-gray-800 text-white p-4 text-right overflow-hidden'>
                {Array.from({ length: lineCount }, (_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Code editor */}
              <textarea
                className='bg-black text-white w-[550px] p-4 font-mono resize-none overflow-y-auto'
                value={code}
                onChange={handleCodeChange}
                placeholder='Escreva seu código aqui...'
              />

              {/* Buttons */}
              <div className='absolute bottom-0 right-0 flex bg-[#302D2D] text-white w-[560px] justify-end'>
                <button className='bg-[#0E7886] w-[150px] px-4 py-1'>Executar</button>
                <button className='bg-[#C8952FC7] w-[150px] px-4 py-1'>Salvar</button>
                <button className='bg-[#0E862E] w-[150px] px-4 py-1'>Enviar</button>
              </div>
            </div>
          </div>

          <div className='mt-10 flex justify-center'>
            <div className='flex text-white shadow-md'>
              <button
                className={`w-[400px] h-[60px] flex items-center justify-center ${selectedIndex === 0 ? 'bg-white text-gray-400' : 'bg-red-600'}`}
                onClick={handlePrevious}
                disabled={selectedIndex === 0}
              >
                <h2 className='flex items-center space-x-2'>
                  <FaAngleLeft />
                  <span>Anterior</span>
                </h2>
              </button>

              <button
                className={`w-[400px] h-[60px] flex items-center justify-center ${selectedIndex === ListaDeExerciciosItems.length - 1 ? 'bg-white text-gray-400' : 'bg-green-600'}`}
                onClick={handleNext}
                disabled={selectedIndex === ListaDeExerciciosItems.length - 1}
              >
                <h2 className='flex items-center space-x-2'>
                  <span>Próximo</span>
                  <FaAngleRight />
                </h2>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='ml-[1310px] bg-[#302D2DCC] w-[200px] h-[800px]'>
        <div className='text-white p-4'>
          <p>Lista de Exercícios 01</p>
          <h1 className='text-lg'>Introdução à Linguagem C</h1>
        </div>

        {ListaDeExerciciosItems.map((item, index) => (
          <button
            key={item.numero}
            className={`h-[115px] w-[200px] border-2 border-[#707070] relative ${index === selectedIndex ? 'bg-white text-black' : 'bg-[#302D2D] text-white'}`}
            onClick={() => handleSelectExercise(index)}
          >
            {index === selectedIndex && (
              <div className='absolute top-0 left-0 w-full bg-[#0E7886] text-white text-center py-1'>
                Atual
              </div>
            )}
            <div className='p-2 pt-8'>
              <p className='text-gray-400 text-sm'>Exercício {item.numero}</p>
              <h1 className='text-lg'>{item.titulo}</h1>
            </div>
          </button>
        ))}
      </div>

      {/* Dicas Modal */}
      {showDicas && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
          <div className='relative w-[1000px] h-auto bg-white shadow-lg text-black'>
            <h1 className='text-2xl font-semibold bg-[#0E7886] text-white h-[51px] flex items-center p-5'>
              Dicas
            </h1>
            <p className='p-5'>
              Consulte aqui as dicas especialmente preparadas para auxiliar-lhe na resolução do exercício.
            </p>
            <div className='p-5 flex justify-around'>
              <button
                className={`relative w-[120px] h-[41px] text-[#0E7886] ${showSimplificarProblema ? 'active' : ''}`}
                onClick={() => {
                  setShowSimplificarProblema(!showSimplificarProblema);
                  if (showSimplificarProblema) {
                    setShowSintaxe(false);
                    setShowDescricaoDetalhada(false);
                  } else {
                    setShowSintaxe(false);
                    setShowDescricaoDetalhada(false);
                  }
                }}
              >
                Simplificando o <strong className='text-xl'>Problema</strong>
                {showSimplificarProblema && (
                  <div className='absolute -bottom-4 left-0 w-full border-b-4 border-[#0E7886]'></div>
                )}
              </button>

              <button
                className={`relative w-[120px] h-[41px] text-[#0E7886] ${showSintaxe ? 'active' : ''}`}
                onClick={() => {
                  setShowSintaxe(!showSintaxe);
                  if (showSintaxe) {
                    setShowSimplificarProblema(false);
                    setShowDescricaoDetalhada(false);
                  } else {
                    setShowSimplificarProblema(false);
                    setShowDescricaoDetalhada(false);
                  }
                }}
              >
                Entendendo a <strong className='text-xl'>Sintaxe</strong>
                {showSintaxe && (
                  <div className='absolute -bottom-4 left-0 w-full border-b-4 border-[#0E7886]'></div>
                )}
              </button>
              
              <button
                className={`relative w-[120px] h-[41px] text-[#0E7886] ${showDescricaoDetalhada ? 'active' : ''}`}
                onClick={() => {
                  setShowDescricaoDetalhada(!showDescricaoDetalhada);
                  if (showDescricaoDetalhada) {
                    setShowSimplificarProblema(false);
                    setShowSintaxe(false);
                  } else {
                    setShowSimplificarProblema(false);
                    setShowSintaxe(false);
                  }
                }}
              >
                Descrição <strong className='text-xl'>Detalhada</strong>
                {showDescricaoDetalhada && (
                  <div className='absolute -bottom-4 left-0 w-full border-b-4 border-[#0E7886]'></div>
                )}
              </button>
            </div>

            {showSimplificarProblema && (
              <div className='p-5'>
                <h2 className='relative bg-[#0E7886] text-white w-40 px-4 text-xl'>{selectedExercise.dica}</h2>
                <p className='p-5'>{selectedExercise.explicacao}</p>
                <p className='px-5'>{selectedExercise.note}</p>
                <div className='flex justify-center m-5 italic'>
                  <img src={selectedExercise.ExImg} alt='Exemplo' />  
                </div>
                
              </div>
            )}

            {showSintaxe && (
              <div className='p-5'>
                <p className='italic'><strong>{selectedExercise.funcao}</strong></p>
                <p className='px-5'>{selectedExercise.explixacao}</p>
                <p className='flex justify-center m-5 italic'>{selectedExercise.expm}</p>
              </div>
            )}

            {showDescricaoDetalhada && (
              <div className='p-5'>
                <p>{selectedExercise.text}</p>
                <p className='mt-2 p-5 border-4'>{selectedExercise.passos}</p>
              </div>)}
              
              <button
                onClick={handleCloseModal(setShowDicas)}
                className='absolute top-[-10px] right-[-10px] w-8 h-8 bg-red-700 text-white flex items-center justify-center'
              >
              <IoCloseSharp className='w-8 h-8' />
            </button>
          </div>
        </div>
      )}

      {/* Código de Apoio Modal */}
      {showCodigoApoio && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
          <div className='relative w-[1273px] h-auto bg-white shadow-lg z-50 text-black'>
            <h1 className='text-xl bg-[#0E7886] text-white h-[51px] flex items-center p-5'>
              Código de Apoio
            </h1>
            <div className='p-5'>
              <p>{selectedExercise.int}</p>
              <h2 className='relative bg-[#0E7886] text-white w-80 px-4 mt-4 text-xl'>{selectedExercise.operacao}</h2>
              <p className='pt-4'>{selectedExercise.int2}</p>
              <p className='mt-2 p-5 border-4'>{selectedExercise.codigo}</p>
            </div>

            <button
              onClick={handleCloseModal(setShowCodigoApoio)}
              className='absolute top-[-10px] right-[-10px] w-8 h-8 bg-red-700 text-white flex items-center justify-center'
            >
              <IoCloseSharp className='w-8 h-8' />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
