import React, { useEffect } from "react";
import Head from 'next/head'
import styles from '@/styles/Home.module.scss'

export default function Home() {

    useEffect(() => {
        console.log(process.env.NEXT_PUBLIC_API)
    }, [])

    return (
        <>
            <Head>
              <title>Hashtify</title>
            </Head>
            test
        </>
    )

}
