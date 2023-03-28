import { Request, Response, Router } from 'express';
const googleTrends = require('google-trends-api');

const router = Router();

interface TimelineData {
    "time": string,
    "formattedTime": string,
    "formattedAxisTime": string,
    "value": number[],
    "hasData": boolean[],
    "formattedValue": string[]
}

interface InterestResponse {
    default: {
        timelineData: TimelineData[]
    }
}

// /trends
router.get('', async (req: Request, res: Response) => {
    try {
        const text: string = req.query.text as string;

        if (!text) return res.status(400).json({ error: "No text provided" });
        if (text.length > 1000) return res.status(400).json({ error: "Text text is too long" });

        console.log(new Date(), `[trend-service]: /trends text = ${text}`);

        const data = await googleTrends.interestOverTime({keyword: text}).then((res: any) => JSON.parse(res)) as InterestResponse

        let result: TimelineData[] = data.default.timelineData;

        result = result.filter(data => data.value[0] > 0)

        res.send(result);
    } catch (e) {
        return res.status(500).json({ error: "Internal error" })
    }
})

export default router;
