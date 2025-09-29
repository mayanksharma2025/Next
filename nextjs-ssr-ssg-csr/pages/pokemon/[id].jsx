/* eslint-disable @next/next/no-img-element */

import React from 'react'

import Head from 'next/head'

import Link from 'next/link'

import styles from '../../styles/Detail.module.css'

export async function getStaticPaths() {
  const resp = await fetch(
    'https://raw.githubusercontent.com/jherr/pokemon/main/index.json'
  )

  const pokemon = await resp.json()

  return {
    paths: pokemon.map((pokemon) => ({
      params: { id: pokemon.id.toString() },
    })),

    fallback: 'blocking', // true, false
  }
}

export async function getStaticProps({ params }) {
  const resp = await fetch(
    `https://raw.githubusercontent.com/jherr/pokemon/main/pokemon/${params.id}.json`
  )
  const pokemon = await resp.json()

  // Add random number at build time (ISR regenerate hone par ye change hoga)
  pokemon.randomNumber = Math.floor(Math.random() * 1000)
  return {
    props: {
      pokemon,
    },
    revalidate: 30,
  }
}

export default function Details({ pokemon }) {
  if (!pokemon) {
    return null
  }

  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>

      <div>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </div>

      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`https://raw.githubusercontent.com/jherr/pokemon/main/images/${pokemon.name.toLowerCase()}.jpg`}
            alt={pokemon.name}
          />
        </div>

        <div>
          <div className={styles.name}>
            {pokemon.name} {pokemon.randomNumber}
          </div>

          <div className={styles.type}>{pokemon.type.join(', ')}</div>

          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>

                <th>Value</th>
              </tr>
            </thead>

            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>

                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/*
Comparison Table:
Fallback   --    Mode           --           Predefined  --   Paths	--  Unknown Paths Behavior --	Loader?	SEO Friendly? --	Page Cache After First Load
false	     --  Only those built	--            404 Error	 --     ❌  --            ✅	        --         ❌
true  -- 	Built at build	Generated on-demand -- ✅	    --     ⚠️  --         (Needs JS)	   --         ✅
"blocking"  --	Built at build      --	Generated on-demand     ❌	    --         ✅          --       	✅


🛠 Real-World Use-Case Summary
Situation	Use Which Fallback?
Small dataset (e.g. 151 Pokémon)	false
Large blog site, lots of posts	true or "blocking"
SEO important, don't want loader	"blocking"
Internal dashboard, only known users allowed	false


🔚 TL;DR
Approach	                 Speed at Build	     Runtime Speed	      SEO	         Best For
getStaticPaths(false)	      ❌Very slow	       ✅Fast              ✅	      Small dataset
getStaticPaths (true)	      ✅ Build fast	 ⚠️First load slow	     ⚠️	    Big dataset, rare visits
getServerSideProps()	      ✅ Build fast	 ⚠️Slower per page	     ✅	     Fresh data, large data
Client-side fetching	      ✅ Super fast	 ✅Fast (after load)	    ❌	     Internal tools / apps

*/
