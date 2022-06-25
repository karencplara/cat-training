import { DefaultUi, Player, Youtube } from "@vime/react";
import { CaretRight, DiscordLogo, FileArrowDown, Lightning } from "phosphor-react";

import '@vime/core/themes/default.css';
import { useGetLessonBySlugQuery } from "../generated";

interface VideoProps {
  lessonSlug: string;
}

export function Video(props: VideoProps) {
   const { data } = useGetLessonBySlugQuery({
     variables: {
       slug: props.lessonSlug,
     }
   })

   if(!data || !data.lesson) {
     return (
       <div className="flex-1">
         <p>Carregando...</p>
       </div>
     )
   }
  return (
    <div className="flex-1">
      <div className="bg-rose-200 flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video ">
          <Player>
            <Youtube videoId={data.lesson.videoId}/>
            <DefaultUi />
          </Player>
        </div>
      </div>
      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
           <h1 className="text-2xl font-bold">
              {data.lesson.title}
           </h1>
           <p className="mt-4 text-gray-400 leading-relaxed">
             {data.lesson.description}
           </p>

         {data.lesson.teacher && (
          <div className="flex items-center gap-4 mt-6">
             <img 
               className="h-16 w-16 rounded-full border-2 border-rose-300"
               src={data.lesson.teacher.avatarURL} 
               alt="" 
              />

             <div className="leading-relaxed">
               <strong className="font-bold text-2xl block">
                 {data.lesson.teacher.name}
               </strong>
             </div>
           </div>
         )}
          </div>

          <div className="flex flex-col gap-4">
             <a href="" className="p-4 text-sm bg-rose-400 text-white flex items-center rou nded font-bold uppercase gap-2 justify-center">
               <DiscordLogo size={24} />
               Comunidade do Discord
             </a>

             <a href="" className="p-4 text-sm border border-rose-400 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-rose-300 transition-colors">
               <Lightning size={24} />
               Acesse o desafio
             </a>
          </div>
        </div>
        <div className="gap-8 mt-20 grid-cols-2 flex">
          <a href="" className="bg-border-200 rounded overflow-hidden flex items-stretch gap-6 hover:bg-rose-100">
             <div className="bg-rose-200 h-full p-6 flex items-center">
               <FileArrowDown size={40}/>
             </div>
             <div className="py-6 leading-relaxed">
               <strong className="text-2xl">Material complementar</strong>
              <p className="text-sm text-gray-400 mt-2">
                Acesse o material
              </p>
             </div>
             <div className="h-full p-6 flex items-center">
               <CaretRight size={24}/>
             </div>
          </a>

          <a href="" className="bg-border-200 rounded overflow-hidden flex items-stretch gap-6 hover:bg-rose-100">
             <div className="bg-rose-200 h-full p-6 flex items-center">
               <FileArrowDown size={40}/>
             </div>
             <div className="py-6 leading-relaxed">
               <strong className="text-2xl">Wallpapers exclusivos</strong>
              <p className="text-sm text-gray-400 mt-2">
                Acesse o material
              </p>
             </div>
             <div className="h-full p-6 flex items-center">
               <CaretRight size={24}/>
             </div>
          </a>
        </div>
      </div>
    </div>
  )
}