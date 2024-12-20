import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthMethod, User } from '@prisma/__generated__';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '@/user/user.service';
import {Request} from 'express'
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {

    public constructor(
        private readonly userService:UserService
    ){}

    public async register(req:Request,dto:RegisterDto){
        const isExist = await this.userService.findByEmail(dto.email)     
        
        
        if(isExist){
            throw new ConflictException('Регистрация не удалась. Пользователь с таким email уже существует. Пожалуйста, используйте другой email или войдите в систему.')
        }

        const newUser = await this.userService.create(
            dto.email,
            dto.password,
            dto.name,
            '',
            AuthMethod.CREDENTIALS,
            false
        )
        return this.saveSession(req,newUser)
    }
        
        
    public async login(req:Request,dto:LoginDto){
    
    }


    public async logout(){

    }

    private saveSession(req:Request,user:User){
       return new Promise((resolve,reject)=>{
           req.session.userId = user.id

           req.session.save((err)=>{
               if(err){
                   return reject(new InternalServerErrorException('Не удалось сохранить сессию,проверьте правильно ли настроены параметры сессии'))
               }
               resolve(user)
           })
       })
       
    }
}


