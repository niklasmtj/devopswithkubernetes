import Head from 'next/head'
import Image from '../components/Image'

export const baseDir = __dirname;
export default function Home() {

  const d = new Date()
  const currentDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

  return (
    <div>
      <Head>
        <title>Todos</title>
      </Head>
      <div>
        <Image date={currentDate} />
        <form>
          <input type="text" maxLength={140}></input>
          <button type="submit">Create TODO</button>
        </form>
        <ul>
          <li>TODO 1</li>
          <li>TODO 2</li>
        </ul>
      </div>
    </div>
  )
}
