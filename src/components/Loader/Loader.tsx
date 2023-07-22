'use client';

import { Loader2 } from 'lucide-react';
import { BlockBackground } from '../BlockBackground/BlockBackground';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/store';

interface LoaderProps {
  text?: string;
  description?: string;
}

export const Loader = ({ text = 'Carregando...', description }: LoaderProps) => {
  const state = useSelector((state: RootState) => state);
  const { configuration } = state;

  return (
    <>
      {configuration.globalLoading && (
        <BlockBackground>
          <div className="z-30 flex flex-wrap justify-center">
            <Loader2 color="#fff" className="m-auto mb-1 h-8 w-8 animate-spin sm:h-12 sm:w-12" />
            <span className="w-full text-center font-poppins text-base font-extralight tracking-wider text-gray-50 sm:text-2xl">
              {text}
            </span>
            <span className="mt-3 w-full max-w-xl px-10 text-center font-poppins text-[10px] font-thin tracking-widest text-white sm:text-sm">
              {description}
            </span>
          </div>
        </BlockBackground>
      )}
    </>
  );
};
