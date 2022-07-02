import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom'
import Logo from "../components/Logo";
import Code from "/src/assets/bg-codee.png"
import GifLoading from '/src/assets/loader.gif'

export default function Subscribe() {
    const navigate = useNavigate();

    const CREATE_SUBSCRIBE = gql`
        mutation CreateSubscriber($name: String!, $email: String!) {
            createSubscriber(data: {name: $name, email: $email}) {
                id
            }
        }
    `

    const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBE);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    async function handleSubscriber(event: FormEvent) {
        event.preventDefault();

        await createSubscriber({
            variables: {
                name,
                email
            }
        })

        navigate('/event');
    }
    return (
        <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
            <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
                <div className="max-w-[640]" >
                    <Logo />
                    <h1 className="mt-8 text-[2.5rem] leading-tight">  Construa uma <strong className="text-blue-500"> aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong></h1>
                    <p className="mt-4 text-gray-200 leading-relaxed"> Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado. </p>
                </div>
                <div className="p-8 bg-gray-700 border border-gray-500 rounded">
                    <strong className="text-2xl mb-6 block">Inscreva-se gratuitamente</strong>
                    <form onSubmit={handleSubscriber} className="flex flex-col gap-2 w-full items-center">
                        <input
                            className="bg-gray-900 rounded px-5 h-14"
                            onChange={event => setName(event.target.value)}
                            type="text"
                            placeholder="Seu nome completo"
                        />

                        <input
                            className="bg-gray-900 rounded px-5 h-14"
                            onChange={event => setEmail(event.target.value)}
                            type="text"
                            placeholder="Digite seu e-mail"
                        />

                        {loading ? <img src={GifLoading} width="40px" height="40px" alt="" /> : <button type="submit" disabled={loading} className="mt-4 bg-green-500 uppercase py-4 px-7 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50">Garantir minha vaga</button>}
                    </form>
                </div>
            </div>

            <img src={Code} className="mt-10" alt="" />
        </div>
    )
}