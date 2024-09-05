import React, { useState } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaChevronDown, FaChevronUp, FaPaperclip } from 'react-icons/fa';

export function EnviarDuvidas() {
    const [anexos, setAnexos] = useState([]);
    const [isTematicaOpen, setIsTematicaOpen] = useState(false);
    const [selectedTematica, setSelectedTematica] = useState('');
    const [isIdentificacaoOpen, setIsIdentificacaoOpen] = useState(false);
    const [selectedIdentificacao, setSelectedIdentificacao] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwtToken') || ''); // Obtendo o token do localStorage

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setAnexos((prev) => [...prev, ...files]);
    };

    const handleTematicaClick = () => {
        setIsTematicaOpen(!isTematicaOpen);
    };

    const handleTematicaSelect = (tematica) => {
        setSelectedTematica(tematica);
        setIsTematicaOpen(false);
    };

    const handleIdentificacaoClick = () => {
        setIsIdentificacaoOpen(!isIdentificacaoOpen);
    };

    const handleIdentificacaoSelect = (identificacao) => {
        setSelectedIdentificacao(identificacao);
        setIsIdentificacaoOpen(false);
    };

    const handleSubmit = async () => {
        if (!titulo || !selectedTematica || !selectedIdentificacao || !descricao) {
            setError('Todos os campos devem ser preenchidos.');
            setSuccessMessage('');
            return;
        }

        const data = {
            titulo,
            duvidaAluno: descricao,
            status_resposta: false,
            tematica: selectedTematica,
            aluno: 0, // Substitua com o ID do aluno se necessário
            anonimo: selectedIdentificacao === 'Anônimo'
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/duvidas/duvidas/', data, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                }
            });

            setSuccessMessage('Sua dúvida foi enviada com sucesso.');
            setError('');
            setTitulo('');
            setSelectedTematica('');
            setSelectedIdentificacao('');
            setDescricao('');
            setAnexos([]);
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            setError('Ocorreu um erro ao enviar a dúvida.');
            setSuccessMessage('');
        }
    };

    const renderAnexos = () => {
        return anexos.map((file, index) => {
            if (file.type === 'application/pdf') {
                return (
                    <div key={index} className="flex items-center mt-2">
                        <img 
                            src="img/pdf.png" 
                            alt="PDF"
                            className="h-10 w-10 mr-2 cursor-pointer"
                            onClick={() => window.open(URL.createObjectURL(file))}
                        />
                        <span className="text-sm text-gray-700">{file.name}</span>
                    </div>
                );
            } else if (file.type.startsWith('image/')) {
                return (
                    <div key={index} className="flex items-center mt-2">
                        <img 
                            src={URL.createObjectURL(file)} 
                            alt={file.name}
                            className="h-10 w-10 mr-2 cursor-pointer"
                            onClick={() => window.open(URL.createObjectURL(file))}
                        />
                        <span className="text-sm text-gray-700">{file.name}</span>
                    </div>
                );
            } else {
                return (
                    <div key={index} className="mt-2">
                        <p className="text-sm text-gray-700">{file.name}</p>
                    </div>
                );
            }
        });
    };

    return (
        <div className='mt-[0px] absolute top-[-10px] left-[-550px] pb-20'>
            <h1 className='text-center text-3xl italic font-bold ml-[60px]'>DÚVIDAS</h1>

            <div className='flex pt-20'>
                <a href='/' className='flex flex-col items-center py-1 h-full ml-9'>
                    <FaArrowLeft className='w-10 h-auto' />
                    <p className='w-32 text-sm text-center'>Menu Principal</p>
                </a>

                <div className='flex ml-20'>
                    <a 
                        href='/Duvidas' 
                        className='w-96 h-8 text-black text-xl border-2 border-[#707070] flex justify-center items-center py-5'>
                        Dúvidas Enviadas e Respondidas
                    </a>
                    <a 
                        href='/Enviar-Duvidas' 
                        className='w-96 h-8 bg-[#0E7886] text-white text-xl border-2 border-[#707070] flex justify-center items-center py-5'>
                        Enviar Dúvidas
                    </a>
                </div>
            </div>

            <div className='w-[1120px] h-full mt-8 ml-20 bg-white border-2 border-[#707070] shadow-lg'>
                <div className='h-4 w-full bg-[#0E7886]'></div>
                <div className='m-4'>
                    <div className='flex text-[#707070]'>
                        <input 
                            type="text"
                            placeholder="Título"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            className='w-1/2 h-10 border-2 border-[#707070] p-2'
                         />
                        <div className='w-1/4 ml-4'>
                            <button 
                                className='w-full h-10 border-2 border-[#707070] relative flex justify-between items-center px-2'
                                onClick={handleTematicaClick}
                            >
                                <span className="text-left">
                                    {selectedTematica || 'Temática'}
                                </span>
                                <div className="text-right">
                                    {isTematicaOpen ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                            </button>

                        {isTematicaOpen && (
                            <ul className="bg-white border border-[#707070] text-black">
                                <li 
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleTematicaSelect('Linguagem C')}
                                >
                                    Linguagem C
                                </li>
                                <li 
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleTematicaSelect('Estrutura de Decisão')}
                                >
                                    Estrutura de Decisão
                                </li>
                            </ul>
                        )}
                        </div>
                        
                        <div className='w-1/4 ml-4'>
                            <button 
                                className='w-full h-10 border-2 border-[#707070] relative flex justify-between items-center px-2'
                                onClick={handleIdentificacaoClick}
                            >
                                <span className="text-left">
                                    {selectedIdentificacao || 'Identificação'}
                                </span>
                                <div className="text-right">
                                    {isIdentificacaoOpen ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                            </button>

                        {isIdentificacaoOpen && (
                            <ul className="bg-white border border-[#707070] text-black">
                                <li 
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleIdentificacaoSelect('Anônimo')}
                                >
                                    Anônimo
                                </li>
                                <li 
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleIdentificacaoSelect('Identificado')}
                                >
                                    Identificado
                                </li>
                            </ul>
                        )}
                        </div>
                    </div>
                    <div className='mt-4'>
                        <textarea
                            placeholder='Descrição da dúvida'
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            className='w-full h-40 border-2 border-[#707070] p-2'
                        />
                    </div>

                    <div className='mt-4'>
                        <input 
                            type="file" 
                            multiple
                            onChange={handleFileChange} 
                            className='hidden'
                            id="fileInput"
                        />
                        <label htmlFor="fileInput" className='flex items-center cursor-pointer'>
                            <FaPaperclip className='w-5 h-5 mr-2' />
                            <span>Adicionar Anexos</span>
                        </label>

                        <button 
                            onClick={handleSubmit}
                            className='ml-4 px-4 py-2 bg-[#0E7886] text-white text-xl border-2 border-[#707070]'
                        >
                            Enviar
                        </button>
                    </div>

                    {renderAnexos()}

                    {error && <p className='text-red-500 mt-2'>{error}</p>}
                    {successMessage && <p className='text-green-500 mt-2'>{successMessage}</p>}
                </div>
            </div>
        </div>
    );
}
