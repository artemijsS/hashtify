import React, { useState, useRef, FormEvent } from "react";
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

    const [textInput, setTextInput] = useState<string>('');
    const [query, setQuery] = useState<string>('');
    const [hashtags, setHashtags] = useState<string[]>([]);
    const [images, setImages] = useState<Image[]>([]);
    const [trends, setTrends] = useState<Trend[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [inputClick, setInputClick] = useState<boolean>(false);

    const chart = useRef<any>();
    const mainRef = useRef<HTMLDivElement>();
    const inputRef = useRef<HTMLInputElement>();

    const getData = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!textInput) {
            toast.error("Please enter your text");
            return;
        }

        setLoading(true);

        const ctx = document.getElementById('graph').getContext('2d');

        Promise.all<[string[], Image[], Trend[]]>([getHashtags(), getImages(), getTrends()]).then(([ hashtagsData, imageData, trendData ]) => {
            setHashtags(hashtagsData);
            setImages(imageData);
            setTrends(trendData);
            setQuery(textInput);

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
                    responsive: true,
                    title: {
                        display: false,
                        text: "Trend chart",
                        fontColor: "#8899D7",
                    },
                    hover: {
                        mode: "nearest",
                        intersect: true,
                    }
                }
            });

            if (!inputClick && mainRef.current) {
                console.log(mainRef.current)
                mainRef.current.style.marginTop = '0';
                inputRef.current.style.backgroundColor = '#8899D7';
                setInputClick(true);
            }

            setLoading(false);

        }).catch(_err => {
            setHashtags([]);
            setImages([]);
            setTrends([]);
            toast.error("Uuuups, please try again");
            setLoading(true);
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

    const onInputClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(e.target.value);
    }

    return (
        <>
            <Head>
              <title>Hashtify</title>
            </Head>
            <ToastContainer />
            <div className={styles.mainContainer}>
                <div className={styles.secondWrapper}>
                    <div className={styles.logo}>
                        <svg width="160" height="86" viewBox="0 0 160 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M113.382 47.0309C113.781 48.3746 115.242 49.1809 116.57 48.6434L121.617 46.8965C122.945 46.4934 123.742 45.0152 123.21 43.6715L121.617 38.9684C121.218 37.6246 119.757 36.8184 118.429 37.3559L113.382 38.9684C112.054 39.3715 111.257 40.8496 111.788 42.1934L113.382 47.0309Z" fill="#8899D7"/>
                            <path d="M127.726 77.5349C153.226 69.7411 159.203 58.588 151.632 32.6536C143.929 6.8536 132.773 0.80673 107.273 8.46611C81.773 16.2599 75.7964 27.5474 83.3667 53.3474C91.0698 79.1474 102.226 85.1942 127.726 77.5349ZM96.5151 36.5505L99.3042 35.6099C100.367 35.2067 100.898 34.1317 100.5 33.0567L99.5698 30.1005C98.9058 28.2192 99.5698 26.2036 101.296 25.263C103.421 24.0536 106.078 25.1286 106.875 27.413L107.804 30.3692C108.203 31.5786 109.398 32.1161 110.593 31.713L116.437 29.6974C117.632 29.2942 118.164 28.0849 117.765 26.8755L116.835 24.188C116.171 22.3067 116.835 20.2911 118.562 19.3505C120.687 18.1411 123.343 19.2161 124.14 21.5005L125.203 24.5911C125.601 25.6661 126.664 26.2036 127.726 25.8005L130.515 24.8599C132.375 24.188 134.367 24.8599 135.296 26.6067C136.492 28.7567 135.429 31.4442 133.171 32.2505L130.382 33.1911C129.187 33.5942 128.656 34.8036 129.054 36.013L130.914 41.5224C131.312 42.7317 132.507 43.2692 133.703 42.8661L136.492 41.9255C138.882 41.1192 141.539 42.8661 141.539 45.5536C141.539 47.3005 140.343 48.7786 138.75 49.3161L135.96 50.2567C134.898 50.6599 134.367 51.7349 134.765 52.8099L135.695 55.7661C136.226 57.3786 135.828 59.3942 134.367 60.3349C133.57 60.8724 132.773 61.1411 131.976 61.1411C130.382 61.1411 128.921 60.0661 128.39 58.4536L127.46 55.4974C127.062 54.288 125.867 53.7505 124.671 54.1536L118.828 56.1692C117.632 56.5724 117.101 57.7817 117.5 58.9911L118.429 61.6786C119.093 63.6942 118.164 66.113 116.171 66.7849C115.64 66.9192 115.242 67.0536 114.71 67.0536C113.117 67.0536 111.656 65.9786 111.125 64.3661L110.062 61.2755C109.664 60.2005 108.601 59.663 107.539 60.0661L104.617 61.0067C104.218 61.1411 103.687 61.2755 103.289 61.1411C101.562 61.1411 100.101 59.9317 99.7026 58.1849C99.1714 56.1692 100.5 54.1536 102.492 53.4817L105.015 52.6755C106.21 52.2724 106.742 51.063 106.343 49.8536L104.484 44.3442C104.085 43.1349 102.89 42.5974 101.695 43.0005L98.9058 43.9411C98.5073 44.0755 97.9761 44.2099 97.5776 44.0755C95.8511 44.0755 94.3901 42.8661 93.9917 41.1192C93.3276 39.1036 94.6558 37.088 96.5151 36.5505Z" fill="#8899D7"/>
                            <path d="M64.2857 5.375H10.7143C4.79632 5.375 0 10.1873 0 16.125V69.875C0 75.8127 4.79632 80.625 10.7143 80.625H64.2857C70.2037 80.625 75 75.8127 75 69.875V16.125C75 10.1873 70.1953 5.375 64.2857 5.375ZM56.25 60.4688C56.25 62.6943 54.4503 64.5 52.2321 64.5C50.014 64.5 48.2143 62.7027 48.2143 60.4688V47.0312H26.7857V60.4688C26.7857 62.7027 24.9944 64.5 22.7679 64.5C20.5413 64.5 18.75 62.7027 18.75 60.4688V25.5312C18.75 23.3141 20.558 21.5 22.7679 21.5C24.9777 21.5 26.7857 23.3141 26.7857 25.5312V38.9688H48.2143V25.5312C48.2143 23.3141 50.0223 21.5 52.2321 21.5C54.442 21.5 56.25 23.3057 56.25 25.5312V60.4688Z" fill="#8899D7"/>
                        </svg>
                    </div>
                    <div ref={mainRef} className={styles.main}>
                        <h1>Explore stats so you <br/>will be always in search!</h1>
                        <p>The World biggest stat search source.</p>
                        <form className={styles.form} onSubmit={getData}>
                            <div className={styles.search}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.414 20.586L18.337 15.509C19.386 13.928 20 12.035 20 10C20 4.486 15.514 0 10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C12.035 20 13.928 19.386 15.509 18.337L20.586 23.414C21.366 24.195 22.634 24.195 23.414 23.414C24.195 22.633 24.195 21.367 23.414 20.586ZM3 10C3 6.14 6.14 3 10 3C13.86 3 17 6.14 17 10C17 13.86 13.86 17 10 17C6.14 17 3 13.86 3 10Z" fill="white"/>
                                </svg>
                            </div>
                            <div className={loading ? styles.loader + " " + styles.loading : styles.loader}><span/></div>
                            <input ref={inputRef} type="text" id={"text"} placeholder={"Start your search here"} onChange={onInputClick} autoComplete={"off"}/>
                            <button hidden={true}/>
                        </form>
                    </div>
                    {inputClick &&
                    <>
                        <section className={styles.section + " " + styles.hashtags}>
                            <h2>Hashtags</h2>
                            {hashtags.length > 0 ?
                                <p>{hashtags.map((hashtag) => hashtag + " ")}</p>
                                :
                                <p className={styles.nope}>There are no hashtags for this request</p>
                            }
                        </section>
                        <section className={styles.section + " " + styles.images}>
                            <h2>Images for {query}</h2>
                            <div className={styles.blocks}>
                                {images.length > 0 ?
                                    images.map(image => <Link href={image.urls.raw} target={"_blank"}><img src={image.urls.small} alt={image.alt_description} title={image.alt_description}/></Link>)
                                    :
                                    <p className={styles.nope}>There are no images for this request</p>
                                }
                            </div>
                        </section>
                        <section className={styles.section + " " + styles.trend}>
                            <h2>Google search trend graph</h2>
                            {trends.length === 0 && <p className={styles.nope}>There are no trend data for this request</p>}
                        </section>
                    </>
                    }
                    <div className={styles.graph}>
                        <canvas id='graph'/>
                    </div>
                </div>
            </div>
        </>
    )

}
