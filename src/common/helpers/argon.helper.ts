import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import * as argon from 'argon2'

@Injectable()
export class ArgonHelper {
    async hash (valueToHash: string) {
        return await argon.hash(valueToHash);
    }
}