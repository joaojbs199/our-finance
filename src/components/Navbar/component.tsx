'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <button
          onClick={() => {
            signOut();
          }}
        >
          Sair
        </button>
      ) : (
        <button
          onClick={() => {
            signIn('google', { callbackUrl: '/control-panel' });
          }}
        >
          Entrar
        </button>
      )}
    </div>
  );
};
