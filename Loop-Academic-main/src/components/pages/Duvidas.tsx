import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import DuvidasItens from '../data/DuvidasItens';
import axios from 'axios';
export function Duvidas() {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [duvidas, setDuvidas] = useState([]);
    const [tematicas, setTematicas] = useState([]);
    const [novaDuvida, setNovaDuvida] = useState({
        titulo: '',
        duvidaAluno: '',
        status_resposta: false,
        tematica: null,
        aluno: 0, // Será definido conforme o aluno logado
        anonimo: false
    });

    // Função para obter o token JWT do localStorage
    const getToken = () => localStorage.getItem('token');

    // Configuração do axios com o token JWT
    const axiosInstance = axios.create({
        baseURL: 'http://127.0.0.1:8000/',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}` // Verifique o formato do token
        }
    });

    useEffect(() => {
        // Fetch dúvidas enviadas e respondidas
        const fetchDuvidas = async () => {
            try {
                const response = await axiosInstance.get('duvidas/duvidas/');
                setDuvidas(response.data);
            } catch (error) {
                console.error('Erro ao buscar dúvidas:', error);
            }
        };
        
        // Fetch temáticas
        const fetchTematicas = async () => {
            try {
                const response = await axiosInstance.get('tematicas/'); // Ajuste a URL conforme necessário
                setTematicas(response.data);
            } catch (error) {
                console.error('Erro ao buscar temáticas:', error);
            }
        };
        
        fetchDuvidas();
        fetchTematicas();
    }, []);

    const handleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNovaDuvida({
            ...novaDuvida,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('duvidas/duvidas/', novaDuvida);
            // Reset form and fetch updated list of dúvidas
            setNovaDuvida({
                titulo: '',
                duvidaAluno: '',
                status_resposta: false,
                tematica: null,
                aluno: 0,
                anonimo: false
            });
            const response = await axiosInstance.get('duvidas/duvidas/');
            setDuvidas(response.data);
        } catch (error) {
            console.error('Erro ao enviar dúvida:', error);
        }
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
                        className='w-96 h-8 bg-[#0E7886] text-white text-xl border-2 border-[#707070] flex justify-center items-center py-5'>
                        Dúvidas Enviadas e Respondidas
                    </a>
                    <a 
                        href='/Enviar-Duvidas' 
                        className='w-96 h-8 text-black text-xl border-2 border-[#707070] flex justify-center items-center py-5'>
                        Enviar Dúvidas
                    </a>
                </div>
            </div>

            <div className='pt-20'>
                <h2 className='text-xl font-bold mb-4'>Enviar Nova Dúvida</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='titulo'
                        placeholder='Título'
                        value={novaDuvida.titulo}
                        onChange={handleChange}
                        className='w-full mb-4 p-2 border border-gray-300'
                    />
                    <textarea
                        name='duvidaAluno'
                        placeholder='Digite sua dúvida aqui...'
                        value={novaDuvida.duvidaAluno}
                        onChange={handleChange}
                        className='w-full mb-4 p-2 border border-gray-300'
                    />
                    <select
                        name='tematica'
                        value={novaDuvida.tematica}
                        onChange={handleChange}
                        className='w-full mb-4 p-2 border border-gray-300'
                    >
                        <option value='' disabled>Selecione a Temática</option>
                        {tematicas.map((tematica) => (
                            <option key={tematica.id} value={tematica.id}>
                                {tematica.nome}
                            </option>
                        ))}
                    </select>
                    <label>
                        <input
                            type='checkbox'
                            name='anonimo'
                            checked={novaDuvida.anonimo}
                            onChange={(e) => setNovaDuvida({ ...novaDuvida, anonimo: e.target.checked })}
                        />
                        Anônimo
                    </label>
                    <button type='submit' className='mt-4 p-2 bg-blue-500 text-white'>Enviar Dúvida</button>
                </form>
            </div>
            <div className='w-[1120px] h-full mt-8 ml-20 bg-white border-2 border-[#707070] shadow-lg'>
                <div className='h-4 w-full bg-[#0E7886]'></div>
                <div className='px-4 py-6 text-black'>
                    {DuvidasItens.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleExpand(index)}
                            className='border-black border-2 flex flex-col items-start rounded-3xl w-full text-left focus:outline-none mb-5'
                        >
                            <div className='flex items-end'>
                                <img 
                                    src={item.status ? 'img/questao.png' : 'img/pergunta.png'} 
                                    alt='ícone dúvida'
                                    className='w-16 ml-2'
                                />
                                <div className='flex items-end space-x-2 ml-2 mb-2'>
                                    <h1 className='w-[450px]'>{item.titulo}</h1>
                                    <h1>Data:</h1>
                                    <p className='text-[#707070] w-[190px]'>{item.date}</p>
                                    <h1>Status:</h1>
                                    <p className={item.status ? 'text-green-500' : 'text-yellow-500'}>
                                        {item.status ? 'RESPONDIDA' : 'AGUARDANDO RESPOSTA'}
                                    </p>
                                </div>
                            </div>

                            {expandedIndex === index && (
                                <div>
                                    <div className='my-4 ml-16 p-4 border border-[#707070] rounded-lg bg-gray-100 w-[500px]'>
                                    <div className='flex flex-col space-y-4'>
                                        <div className='flex items-start'>
                                            <div className='ml-4 text-xs'>
                                                <p>{item.pergunta}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {item.status && (
                                    <div className='my-4 ml-[510px] p-4 border border-[#707070] rounded-lg bg-gray-300 w-[500px]'>
                                        <div className='flex flex-col space-y-4'>
                                            <div className='flex items-start'>
                                                <div className='ml-4 text-xs'>
                                                    <p>{item.resposta}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                </div>
                                
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
