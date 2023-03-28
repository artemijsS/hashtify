import { Request, Response, Router } from 'express';
import axios from "axios";

const router = Router();

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

interface UnsplashResponse {
    "total": number,
    "total_pages": number,
    "results": Image[]
}

// /images
router.get('', async (req: Request, res: Response) => {
    try {
        const text = req.query.text;

        if (!text) return res.status(400).json({ error: "No text provided" });

        console.log(new Date(), `[image-service]: /image text = ${text}`);

        const data = await axios.get<UnsplashResponse>(`${process.env.UNSPLASH_URL}/search/photos?page=1&query=${text}`,
            { headers: { Authorization: `Client-ID ${process.env.UNSPLASH_CLIENTID}` } })
            .then((res) => res.data)
            .catch(err => err.response.data) as UnsplashResponse;

        if (!data.results) return res.status(500).json({ error: data });


        const result = data.results.map(image => {
            return {
                id: image.id,
                alt_description: image.alt_description,
                urls: image.urls
            }
        });


        res.send(result);

    } catch (e) {
        return res.status(500).json({ error: "Internal error" })
    }
})

export default router;
