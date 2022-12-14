import { Injectable } from '@nestjs/common';
import { profile } from './root.model'

@Injectable()
export class Profile {

    async deleteOne(userId: number) {
        try {
            const deleteProfile = await profile.delete({
                where: {
                    userId
                }
            })
            return deleteProfile
        } catch (error) {
            console.error(error)
        }
    }
}