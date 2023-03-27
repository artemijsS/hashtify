import React, { useEffect, useState } from "react";
import Head from 'next/head'
import axios, {AxiosResponse} from "axios";
import styles from '@/styles/Home.module.scss'

export default function Home() {

    const [textInput, setTextInput] = useState<string>('')
    const [hashtags, setHashtags] = useState<string[]>([])

    const getNewHashtags = () => {
        axios.get<string[]>(`/api/hashtag?text=${textInput}`).then((res) => {
            setHashtags(res.data);
        }).catch(err => {
            setHashtags([]);
            console.log(err.response.data)
        })
    }

    return (
        <>
            <Head>
              <title>Hashtify</title>
            </Head>
            <input className={styles.input} type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextInput(e.target.value)}/>
            <button className={styles.button} onClick={() => getNewHashtags()}>GO</button>
            <div className={styles.hashtags}>
                {
                    hashtags.map((hashtag, i) => <div key={i}>{hashtag}</div>)
                }
            </div>
        </>
    )

}
