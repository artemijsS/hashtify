import React, { useState, useRef } from "react";
import Head from 'next/head'
import axios, from "axios";
import styles from '@/styles/Home.module.scss'
import { ToastContainer, toast } from 'react-toastify';
import Chart from 'chart.js/auto';
import Link from "next/link";

interface Image {
    id: string,
    alt_description: string,
    urls: {
        raw: string,
        full: string,
        regular: string,
        small: string
    }
}

interface Trend {
    "time": string,
    "formattedTime": string,
    "formattedAxisTime": string,
    "value": number[],
    "hasData": boolean[],
    "formattedValue": string[]
}

export default function Home() {

    const [textInput, setTextInput] = useState<string>('')
    const [hashtags, setHashtags] = useState<string[]>([])
    const [images, setImages] = useState<Image[]>([])
    const [trends, setTrends] = useState<Trend[]>([])

    const chart = useRef<any>()

    const getData = () => {
        if (!textInput) {
            toast.error("Please enter your text");
            return;
        }

        const ctx = document.getElementById('myChart').getContext('2d');

        Promise.all<[string[], Image[], Trend[]]>([getHashtags(), getImages(), getTrends()]).then(([ hashtagsData, imageData, trendData ]) => {
            setHashtags(hashtagsData);
            setImages(imageData);
            setTrends(trendData);

            if (chart.current) {
                chart.current.clear();
                chart.current.destroy();
            }
            const trendsData = trendData as Trend[];
            chart.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: trendsData.map(trend => trend.formattedTime),
                    datasets: [{
                        data: trendsData.map(trend => trend.value[0]),
                        label: "Trend",
                        borderColor: "#3e95cd",
                        backgroundColor: "#7bb6dd",
                        fill: false,
                    }]
                },
                options: {
                    responsive: true
                }
            });

        }).catch(_err => {
            setHashtags([]);
            setImages([]);
            setTrends([]);
            toast.error("Uuuups, please try again");
        })

    }

    const getHashtags = () => {
        return axios.get<string[]>(`/api/hashtag?text=${textInput}`).then((res) => res.data);
    }

    const getImages = () => {
        return axios.get<Image[]>(`/api/image?text=${textInput}`).then((res) => res.data)
    }

    const getTrends = () => {
        return axios.get<Trend[]>(`/api/trend?text=${textInput}`).then((res) => res.data)
    }

    return (
        <>
            <Head>
              <title>Hashtify</title>
            </Head>
            <ToastContainer />
            <input className={styles.input} type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextInput(e.target.value)}/>
            <button className={styles.button} onClick={() => getData()}>GO</button>
            <div className={styles.hashtags}>
                {
                    hashtags.map((hashtag, i) => <div key={i}>{hashtag}</div>)
                }
                {
                    images.map(image => <Link href={image.urls.raw} target={"_blank"}><img className={styles.img} key={image.id} src={image.urls.small} alt={image.alt_description}/></Link>)
                }
            </div>
            <div className={styles.chart}>
                <canvas id='myChart'/>
            </div>
        </>
    )

}
