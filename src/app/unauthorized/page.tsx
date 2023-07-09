import Link from 'next/link';

export default async function Unauthorized() {
  return (
    <div>
      <h1>Usuário não authorizado.</h1>
      <Link href="/">Ir para login</Link>
    </div>
  );
}
