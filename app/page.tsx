import Link from 'next/link';

async function getNotes() {
  // const db = new PocketBase('http://127.0.0.1:8090');
  // const result = await db.records.getList('notes');
  const res = await fetch('http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30', { cache: 'no-store' });
  const data = await res.json();
  return data?.items as any[];
}

export default async function Page() {
  const notes = await getNotes();

  return (
    <><section className="flex text-black h-screen justify-center align-middle items-center bg-[url('../img/bg.jpg')] bg-cover bg-center">
      <h1 className="font-bold text-5xl text-center transition-all duration-500 hover:text-white">Test</h1>
    </section><section className="flex text-white h-screen justify-center align-middle items-center bg-black">
        <h1 className="font-bold text-5xl text-center transition-all duration-500">Notes</h1>

        <div>
          {notes?.map((note) => {
            return <Note key={note.id} note={note} />;
          })}
        </div>
      </section></>
  )
}

function Note({ note }: any) {
  const { id, title, content, created } = note || {};

  return (
    <Link href={`/notes/${id}`}>
      <div>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>
    </Link>
  );
}