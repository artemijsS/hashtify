import { Request, Response, Router } from 'express';
import axios from "axios";

const router = Router();

interface Hashtag {
    "hashtag": string,
    "tag": string,
    "tweets": number,
    "exposure": number,
    "retweets": number,
    "images": number,
    "links": number,
    "mentions": number,
    "color": number
}


// /hashtags
router.get('', async (req: Request, res: Response) => {
    try {
        const text = req.query.text as string;

        if (!text) return res.status(400).json({ error: "No text provided" });
        if (text.length > 1000) return res.status(400).json({ error: "Text text is too long" });

        console.log(new Date(), `[hashtify-service]: /hashtags text = ${text}`);

        // const data = await axios.get<RiteKitResponse>(`${process.env.RITEKIT_URL}/hashtag-suggestions?text=${text}&client_id=${process.env.RITEKIT_CLIENTID}`)
        //     .then((res) => res.data)
        //     .catch(err => err.response.data) as RiteKitResponse;
        //
        // if (!data.data) return res.status(500).json({ error: data.message });

        const test = {
            "result": true,
            "code": 200,
            "message": "OK",
            "data": [
                {
                    "hashtag": "pc",
                    "tag": "pc",
                    "tweets": 104,
                    "exposure": 105488,
                    "retweets": 38,
                    "images": 32.0,
                    "links": 32.0,
                    "mentions": 28.0,
                    "color": 3
                },
                {
                    "hashtag": "gaming",
                    "tag": "gaming",
                    "tweets": 483,
                    "exposure": 666088,
                    "retweets": 71,
                    "images": 30.0,
                    "links": 30.0,
                    "mentions": 24.0,
                    "color": 3
                },
                {
                    "hashtag": "gostei",
                    "tag": "gostei",
                    "tweets": 4,
                    "exposure": 33,
                    "retweets": 0,
                    "images": 0.0,
                    "links": 0.0,
                    "mentions": 100.0,
                    "color": 2
                },
                {
                    "hashtag": "xbox",
                    "tag": "xbox",
                    "tweets": 121,
                    "exposure": 174633,
                    "retweets": 75,
                    "images": 38.0,
                    "links": 38.0,
                    "mentions": 27.0,
                    "color": 3
                },
                {
                    "hashtag": "game",
                    "tag": "game",
                    "tweets": 150,
                    "exposure": 144138,
                    "retweets": 38,
                    "images": 45.0,
                    "links": 45.0,
                    "mentions": 22.0,
                    "color": 3
                },
                {
                    "hashtag": "gta",
                    "tag": "gta",
                    "tweets": 21,
                    "exposure": 750,
                    "retweets": 17,
                    "images": 0.0,
                    "links": 0.0,
                    "mentions": 57.0,
                    "color": 3
                },
                {
                    "hashtag": "gameplay",
                    "tag": "gameplay",
                    "tweets": 58,
                    "exposure": 114462,
                    "retweets": 21,
                    "images": 29.0,
                    "links": 29.0,
                    "mentions": 29.0,
                    "color": 3
                },
                {
                    "hashtag": "xboxone",
                    "tag": "xboxone",
                    "tweets": 8,
                    "exposure": 50850,
                    "retweets": 0,
                    "images": 50.0,
                    "links": 50.0,
                    "mentions": 0.0,
                    "color": 3
                },
                {
                    "hashtag": "phone",
                    "tag": "phone",
                    "tweets": 33,
                    "exposure": 16479,
                    "retweets": 0,
                    "images": 64.0,
                    "links": 64.0,
                    "mentions": 0.0,
                    "color": 3
                },
                {
                    "hashtag": "para",
                    "tag": "para",
                    "tweets": 0,
                    "exposure": 0,
                    "retweets": 4,
                    "images": 0.0,
                    "links": 0.0,
                    "mentions": 0.0,
                    "color": 2
                },
                {
                    "hashtag": "version",
                    "tag": "version",
                    "tweets": 4,
                    "exposure": 117,
                    "retweets": 0,
                    "images": 0.0,
                    "links": 0.0,
                    "mentions": 0.0,
                    "color": 2
                },
                {
                    "hashtag": "case",
                    "tag": "case",
                    "tweets": 17,
                    "exposure": 8312,
                    "retweets": 0,
                    "images": 47.0,
                    "links": 47.0,
                    "mentions": 24.0,
                    "color": 3
                },
                {
                    "hashtag": "banking",
                    "tag": "banking",
                    "tweets": 54,
                    "exposure": 18120504,
                    "retweets": 25,
                    "images": 31.0,
                    "links": 31.0,
                    "mentions": 31.0,
                    "color": 3
                },
                {
                    "hashtag": "android",
                    "tag": "android",
                    "tweets": 67,
                    "exposure": 37908,
                    "retweets": 37,
                    "images": 31.0,
                    "links": 31.0,
                    "mentions": 12.0,
                    "color": 3
                },
                {
                    "hashtag": "work",
                    "tag": "work",
                    "tweets": 67,
                    "exposure": 691533,
                    "retweets": 21,
                    "images": 43.0,
                    "links": 43.0,
                    "mentions": 18.0,
                    "color": 3
                },
                {
                    "hashtag": "gamer",
                    "tag": "gamer",
                    "tweets": 117,
                    "exposure": 95321,
                    "retweets": 16,
                    "images": 46.0,
                    "links": 46.0,
                    "mentions": 28.0,
                    "color": 3
                },
                {
                    "hashtag": "twitter",
                    "tag": "twitter",
                    "tweets": 542,
                    "exposure": 8235050,
                    "retweets": 541,
                    "images": 28.0,
                    "links": 28.0,
                    "mentions": 41.0,
                    "color": 3
                },
                {
                    "hashtag": "fortnite",
                    "tag": "fortnite",
                    "tweets": 329,
                    "exposure": 1689529,
                    "retweets": 367,
                    "images": 30.0,
                    "links": 30.0,
                    "mentions": 13.0,
                    "color": 3
                },
                {
                    "hashtag": "mac",
                    "tag": "mac",
                    "tweets": 17,
                    "exposure": 3871,
                    "retweets": 0,
                    "images": 47.0,
                    "links": 47.0,
                    "mentions": 0.0,
                    "color": 3
                },
                {
                    "hashtag": "giveaway",
                    "tag": "giveaway",
                    "tweets": 1921,
                    "exposure": 5198821,
                    "retweets": 4808,
                    "images": 7.0,
                    "links": 7.0,
                    "mentions": 51.0,
                    "color": 3
                },
                {
                    "hashtag": "windows",
                    "tag": "windows",
                    "tweets": 25,
                    "exposure": 5846,
                    "retweets": 0,
                    "images": 32.0,
                    "links": 32.0,
                    "mentions": 0.0,
                    "color": 3
                },
                {
                    "hashtag": "likedvideo",
                    "tag": "likedvideo",
                    "tweets": 4,
                    "exposure": 112,
                    "retweets": 0,
                    "images": 0.0,
                    "links": 0.0,
                    "mentions": 0.0,
                    "color": 2
                },
                {
                    "hashtag": "waseem",
                    "tag": "waseem",
                    "tweets": 0,
                    "exposure": 0,
                    "retweets": 4,
                    "images": 0.0,
                    "links": 0.0,
                    "mentions": 0.0,
                    "color": 2
                },
                {
                    "hashtag": "players",
                    "tag": "players",
                    "tweets": 4,
                    "exposure": 446,
                    "retweets": 0,
                    "images": 0.0,
                    "links": 0.0,
                    "mentions": 0.0,
                    "color": 3
                },
                {
                    "hashtag": "controller",
                    "tag": "controller",
                    "tweets": 4,
                    "exposure": 1429,
                    "retweets": 0,
                    "images": 0.0,
                    "links": 0.0,
                    "mentions": 0.0,
                    "color": 3
                },
                {
                    "hashtag": "playing",
                    "tag": "playing",
                    "tweets": 21,
                    "exposure": 69738,
                    "retweets": 0,
                    "images": 19.0,
                    "links": 19.0,
                    "mentions": 0.0,
                    "color": 3
                },
                {
                    "hashtag": "switch",
                    "tag": "switch",
                    "tweets": 108,
                    "exposure": 198817,
                    "retweets": 142,
                    "images": 16.0,
                    "links": 16.0,
                    "mentions": 7.0,
                    "color": 3
                },
                {
                    "hashtag": "space",
                    "tag": "space",
                    "tweets": 62,
                    "exposure": 77771,
                    "retweets": 46,
                    "images": 47.0,
                    "links": 47.0,
                    "mentions": 40.0,
                    "color": 3
                },
                {
                    "hashtag": "home",
                    "tag": "home",
                    "tweets": 83,
                    "exposure": 114871,
                    "retweets": 84,
                    "images": 30.0,
                    "links": 30.0,
                    "mentions": 14.0,
                    "color": 3
                },
                {
                    "hashtag": "games",
                    "tag": "games",
                    "tweets": 158,
                    "exposure": 334817,
                    "retweets": 63,
                    "images": 24.0,
                    "links": 24.0,
                    "mentions": 27.0,
                    "color": 3
                }
            ]
        };

        const result = test.data.map((hashtag: Hashtag) => "#" + hashtag.tag)

        res.send(result);
    } catch (e) {
        return res.status(500).json({ error: "Internal error" })
    }
})

export default router;
