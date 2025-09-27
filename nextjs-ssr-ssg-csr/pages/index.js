// import React, { useState, useEffect } from "react";
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

// export async function getServerSideProps(context) {
//   const pokemonResp = await fetch(
//     "https://raw.githubusercontent.com/jherr/pokemon/main/index.json"
//   );
//   const pokemon = await pokemonResp.json();
//   return {
//     props: {
//       pokemon,
//     },
//   };
// }

// export async function getStaticPaths() {
//   return { paths: [], fallback: true };
// }

export async function getStaticProps(context) {
  const pokemonResp = await fetch(
    'https://raw.githubusercontent.com/jherr/pokemon/main/index.json'
  )
  const pokemon = await pokemonResp.json()
  return {
    props: {
      pokemon,
    },
  }
}

export default function Home({ pokemon }) {
  // const [pokemon, setPokemon] = useState([]);

  // useEffect(() => {
  //   async function getPokemon() {
  //     const pokemonResp = await fetch(
  //       "https://raw.githubusercontent.com/jherr/pokemon/main/index.json"
  //     );
  //     setPokemon(await pokemonResp.json());
  //   }
  //   getPokemon();
  // }, []);

  return (
    <div>
      <Head>
        <title>Pokemon Home Page</title>
      </Head>
      <div className={styles.grid}>
        {/* {JSON.stringify(pokemon)} */}
        {pokemon.map((poke) => (
          <Link href={`/pokemon/${poke.id}`} key={poke.id}>
            <div className={styles.cover}>
              <p>{poke.name}</p>
              <Image
                // src={`/${poke.image.replace('jpg', 'png')}`}
                src={`https://raw.githubusercontent.com/jherr/pokemon/main/images/${poke.name.toLowerCase()}.jpg`}
                alt={poke.name}
                width={80}
                height={80}
                // sizes="(max-width: 768px) 50vw, 80px"
                quality={85}
                unoptimized
                placeholder="blur"
                loading="lazy"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAusB9W1gHfUAAAAASUVORK5CYII="
                onError={(e) => {
                  e.currentTarget.src = '/images/abra.png'
                }}
                // fallback if image not found
                //sizes={10}
                // layout="responsive" //fill,fixed,intrinsic,responsive,undefined.
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
