import { CheckCircle } from 'phosphor-react'
import { Lock } from 'phosphor-react'
import {isPast, format} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Link, useParams } from 'react-router-dom';

interface LessonProps {
    title: string,
    slug: string,
    availableAt: Date,
    type: 'live' | 'class',
}


export default function Lesson(props: LessonProps) {
    const isLessonAvaliable = isPast(props.availableAt);
    const DateFormated = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'MM", {locale: ptBR});

    const { slug } = useParams<{slug: string}>();

    const isActive = slug === props.slug;

    return (
        <Link to={`${isLessonAvaliable ? `/event/lesson/${props.slug}` : '#'}`} className="group">
            <span className="text-gray-300">
                {DateFormated}
            </span>

            <div className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${isActive ? 'bg-green-500' : ''}`}>
                <header className="flex items-center justify-between">
                    {(isLessonAvaliable) ?
                        <span className={`text-sm ${isActive ? 'text-white' : 'text-blue-500'} font-medium flex items-center gap-2`}>
                            <CheckCircle size={20} />
                            Conteúdo liberado
                        </span> :

                        <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                            <Lock size={20} />
                            Em breve
                        </span>
                    }
                    <span className="text-xs rounded px-2 py-[2px] text-white border border-green-300 font-bold">
                        {props.type == 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
                    </span>
                </header>

                <strong className={`${isActive ? 'text-white' : 'text-gray-200'} mt-5 block`}>
                    {props.title}
                </strong>
            </div>
        </Link>
    )
}