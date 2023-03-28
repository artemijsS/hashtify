import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";

@Injectable()
export class TrendService {

    constructor(private readonly http: HttpService) {}

    async getTrend(text: string) {
        if (!text) throw new HttpException({ error: "No text provided" }, HttpStatus.BAD_REQUEST);

        const { data } = await firstValueFrom(this.http.get<string>(`/trends?text=${text}`).pipe(
            catchError((err: AxiosError) => { throw new HttpException({ serviceError: err.response?.data }, HttpStatus.INTERNAL_SERVER_ERROR) })
        ))

        return data;
    }

}
