import Image from 'next/image';
import NotFoundIllustration from '@/src/assets/page_not_found.svg';

export const NotFoundComponent = () => {
  return (
    <div className="absolute left-2/4 top-2/4 flex h-fit w-full -translate-x-2/4 -translate-y-2/4 flex-wrap">
      <p className="w-full px-5 pb-0 pt-0 text-center text-[10px] tracking-[1px] text-gray-50 sm:pb-5 sm:pt-2.5 sm:text-[20px]">
        Desculpe, a página que você buscou não existe.
      </p>
      <Image
        className="m-auto h-36 w-36 sm:h-64 sm:w-64"
        alt="page_not_found"
        src={NotFoundIllustration}
      />
      <a
        className="w-full  p-0 text-center text-[10px] font-medium text-gray-50 transition-[0.2s] duration-[ease] ease-[all] hover:text-gray-400 sm:p-5 sm:text-[18px]"
        href="/control/revenues"
      >
        Voltar para o início
      </a>
    </div>
  );
};
