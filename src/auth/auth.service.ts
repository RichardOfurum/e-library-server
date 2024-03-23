import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';



@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {

    }

    async signIn(user: any) {
        const payload = { sub: user.userId, username: user.username, isAdmin: user.isAdmin };
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
