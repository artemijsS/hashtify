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

interface RiteKitResponse {
    result: boolean,
    code: number,
    message: string,
    data: Hashtag[]
}


// /hashtags
router.get('', async (req: Request, res: Response) => {
    try {
        const text = req.query.text as string;

        if (!text) return res.status(400).json({ error: "No text provided" });
        if (text.length > 1000) return res.status(400).json({ error: "Text text is too long" });

        console.log(new Date(), `[hashtify-service]: /hashtags text = ${text}`);

        const data = await axios.get<RiteKitResponse>(`${process.env.RITEKIT_URL}/hashtag-suggestions?text=${text}&client_id=${process.env.RITEKIT_CLIENTID}`)
            .then((res) => res.data)
            .catch(err => err.response.data) as RiteKitResponse;

        if (!data.data) return res.status(500).json({ error: data.message });

        const result = data.data.map((hashtag: Hashtag) => "#" + hashtag.tag)

        res.send(result);
    } catch (e) {
        return res.status(500).json({ error: "Internal error" })
    }
})

export default router;
