/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Detail.module.css'
import Image from 'next/image'

// export async function getServerSideProps({ params }) {
//   const pokemonResp = await fetch(
//     `https://raw.githubusercontent.com/jherr/pokemon/main/pokemon/${params.id}.json`
//   );
//   const pokemon = await pokemonResp.json();
//   return {
//     props: {
//       pokemon,
//     },
//   };
// }

export async function getStaticPaths() {
  const pokemonResp = await fetch(
    'https://raw.githubusercontent.com/jherr/pokemon/main/index.json'
  )
  const pokemon = await pokemonResp.json()

  return {
    paths: pokemon.map(({ id }) => ({ params: { id: id.toString() } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const pokemonResp = await fetch(
    `https://raw.githubusercontent.com/jherr/pokemon/main/pokemon/${params.id}.json`
  )
  const pokemon = await pokemonResp.json()
  return {
    props: {
      pokemon,
    },
    // revalidate: 60,
  }
}

export default function Home({ pokemon }) {
  return (
    <div>
      <Head>
        <title>Pokemon Home Page</title>
      </Head>
      <div>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </div>
      <div className={styles.layout}>
        <div>
          <Image
            className={styles.picture}
            src={`https://raw.githubusercontent.com/jherr/pokemon/main/images/${pokemon.name.toLowerCase()}.jpg`}
            alt={pokemon.name}
            unoptimized
            sizes="(max-width: 768px) 60vw, 120px"
            loading="eager"
            priority
            width={100}
            height={100}
            style={{ width: '100%', height: 'auto' }} // responsive
          />
        </div>
        <div>
          {JSON.stringify(pokemon)}
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(', ')}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>

            <tbody>
              {pokemon.stats.map((k) => (
                <tr key={k}>
                  <td className={styles.attribute}>{k.name}</td>
                  <td>{k.value}</td>
                </tr>
              ))}
              <br />
              {Object.keys(pokemon.type).map((k) => (
                <tr key={k}>
                  <td className={styles.attribute}>{k}</td>
                  <td>{pokemon.type[k]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
