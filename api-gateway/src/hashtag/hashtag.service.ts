import { Injectable } from '@nestjs/common';

@Injectable()
export class HashtagService {

    async getHello() {
        return "Hello World"
    }
}
