import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        try {
            console.log('inside the guard')
            const request = context.switchToHttp().getRequest();
            const token = request.headers.authorization.split(' ')[1];
            // console.log(token);

            if (!token) {
                throw new UnauthorizedException();
            }
            request.user = this.jwtService.verify(token);
            // console.log("Richard")
        } catch (error) {
            console.log(error.message);
            throw new UnauthorizedException();
        }

        return true;

    }
}