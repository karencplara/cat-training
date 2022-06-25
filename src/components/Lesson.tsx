import { CheckCircle, Lock } from 'phosphor-react';
import { isPast, format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string}>();

  const isLessonAvailable = isPast(props.availableAt);
  const availableDateFormatted = format(props.availableAt, "EEEE' . 'd ' de ' MMMM ' . 'k'h'mm",  {
    locale: ptBr
  });

  const isActiveLesson = slug === props.slug;

  return (
    <Link to={`/event/lesson/${props.slug}`} className="group">
      <span className="text-gray-400">
        {availableDateFormatted}
      </span>

      <div className={classNames('rounded border border-rose-200 p-4 mt-2 group-hover:border-rose-400', {
        'bg-rose-200': isActiveLesson,
      })}>
        <header className="flex items-center justify-between">
         {isLessonAvailable ? (
            <span className="text-sm text-blue-500 font-medium flex items-center gap-2">
              <CheckCircle size={20} />
              Contéudo liberado
            </span>
         ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
         )}
          <span className="text-xs rounded py-[0.125rem] px-2 text-gray-500 border border-rose-200 font-bold">
            {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>
        <strong className="text-gray-400 mt-5 block">
           {props.title}
        </strong>
      </div>
    </Link>
  )
}