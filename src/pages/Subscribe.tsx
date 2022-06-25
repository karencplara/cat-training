import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../generated";

import imgUrl from '../../src/assets/cat.jpg';

export function Subscribe() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [createSubscriber, { loading }] = useCreateSubscriberMutation();

  async function handleSubscribe(event: FormEvent) {
    event?.preventDefault();

    await createSubscriber({
      variables: {
        name,
        email,
      }
    })
    navigate('/event');
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <Logo />

          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Aprenda tudo sobre seu <strong className="text-rose-300">gatinho</strong> com nossas aulas
          </h1>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Nossas aulas são especializadas e profissionais
          </p>
        </div>
        <div className="p-8 bg-rose-300 border border-rose-200 rounded">
          <strong className="text-2xl mb-6 block text-white">Inscreva-se gratuitamente</strong>
          <form  onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
            <input 
              className="bg-rose-200 rounded px-5 h-14"
              type="text"
              placeholder="Seu nome completo"
              onChange={event => setName(event.target.value)}
            />
             <input 
              className="bg-rose-200 rounded px-5 h-14"
              type="email"
              placeholder="Seu e-mail"
              onChange={event => setEmail(event.target.value)}
            />

            <button
             type="submit"
             disabled={loading}
             className="mt-4 bg-rose-400 uppercase py-4 rounded font-bold text-sm text-white hover:bg-rose-200 disabled:opacity-50"
            >
              Garantir a minha vaga
            </button>
          </form>
        </div>
      </div>
      <img src={imgUrl} className="mt-10" alt=""/>
    </div>
  )
}