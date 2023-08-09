'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Logo from '@/src/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { joinClassNames } from '@/src/utils/Helpers';
import { X as CloseIcon, Menu as MenuIcon } from 'lucide-react';

const navigation = [
  { name: 'Receitas', href: '/control/revenues' },
  { name: 'Despesas', href: '/control/expenses' },
  { name: 'Listas', href: '/control/paymentLists' },
  { name: 'Planos', href: '/control/paymentPlans' },
];

export const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-black">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {session && (
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-neutral-700 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-600">
                    {open ? (
                      <CloseIcon className="h-5 w-5 text-gray-300" />
                    ) : (
                      <MenuIcon className="h-5 w-5 text-gray-300" />
                    )}
                  </Disclosure.Button>
                </div>
              )}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href={session ? pathname : '/'}>
                    <Image className="h-8 w-auto" alt="Our finance" src={Logo} />
                  </Link>
                </div>
                {session && (
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((page, index) => (
                        <Link
                          key={index}
                          href={page.href}
                          className={joinClassNames(
                            pathname === page.href
                              ? 'bg-neutral-800 text-white'
                              : 'text-gray-300 hover:bg-neutral-600 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium',
                          )}
                          aria-current={pathname === page.href ? 'page' : undefined}
                        >
                          {page.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  {!session ? (
                    <Menu.Button
                      onClick={() => {
                        signIn('google', { callbackUrl: '/control/expenses' });
                      }}
                      className="delay-50 rounded-md bg-cyan-600 px-3 py-2 text-sm font-medium text-white transition ease-out hover:bg-cyan-800"
                    >
                      Entrar
                    </Menu.Button>
                  ) : (
                    <div>
                      <div>
                        <Menu.Button className="flex rounded-full bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Abrir menu do usuário</span>
                          <Image
                            width={50}
                            height={50}
                            className="h-11 w-11 rounded-full border-2 border-gray-200"
                            src={session?.user?.image as string}
                            alt="User image"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            <a
                              href="#"
                              className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Gerenciar conta
                            </a>
                          </Menu.Item>
                          <Menu.Item>
                            <Menu.Button
                              onClick={() => {
                                signOut();
                              }}
                              className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Sair
                            </Menu.Button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </div>
                  )}
                </Menu>
              </div>
            </div>
          </div>

          {session && (
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((page, index) => (
                  <Link
                    key={index}
                    href={page.href}
                    className={joinClassNames(
                      pathname === page.href
                        ? 'bg-neutral-800 text-white'
                        : 'text-gray-300 hover:bg-neutral-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium',
                    )}
                    aria-current={pathname === page.href ? 'page' : undefined}
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  );
};
