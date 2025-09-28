import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export async function getServerSideProps() {
  const resp = await fetch(
    'https://raw.githubusercontent.com/jherr/pokemon/main/index.json'
  )
  return {
    props: {
      pokemon: await resp.json(),
    },
  }
}

export default function Home({ pokemon }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>

      <h2>Pokemon List</h2>

      <div className={styles.grid}>
        {pokemon.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <a>
                <Image
                  src={`https://raw.githubusercontent.com/jherr/pokemon/main/images/${pokemon.name.toLowerCase()}.jpg`}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                  unoptimized
                />
                <h3>{pokemon.name}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
