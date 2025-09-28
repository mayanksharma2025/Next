/* eslint-disable @next/next/no-img-element */

import React from 'react'

import Head from 'next/head'

import Link from 'next/link'

import styles from '../../styles/Detail.module.css'

export async function getServerSideProps({ params }) {
  const resp = await fetch(
    `https://raw.githubusercontent.com/jherr/pokemon/main/pokemon/${params.id}.json`
  )

  return {
    props: {
      pokemon: await resp.json(),
    },
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
