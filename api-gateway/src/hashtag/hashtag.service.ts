import {Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import {catchError, firstValueFrom} from "rxjs";
import { AxiosError } from "axios";

@Injectable()
export class HashtagService {

    constructor(private readonly http: HttpService) {}

    async getHashtags(text: string) {
        if (!text) throw new HttpException({ error: "No text provided" }, HttpStatus.BAD_REQUEST);

        const { data } = await firstValueFrom(this.http.get<string>(`/hashtags?text=${text}`).pipe(
            catchError((err: AxiosError) => { throw new HttpException({ serviseError: err.response.data }, HttpStatus.INTERNAL_SERVER_ERROR) })
        ))

        return data;
    }
}
