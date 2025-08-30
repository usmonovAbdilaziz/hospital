import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/register-auth.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from './entities/auth.entity';
import { CryuptoServise } from 'src/utils/hashed';
import { Token } from 'src/utils/token-service';
import { handleError, successMessage } from 'src/helps/responce';
import { loginDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth) private readonly authModel: typeof Auth,
    private readonly crypto: CryuptoServise,
    private readonly tokenService: Token,
  ) {}

  // Register function
  async register(createAuthDto: CreateAuthDto) {
    try {
      const { password, username } = createAuthDto;
      const usernam=await this.authModel.findOne({where:{username}})
      if(usernam){
        throw new ConflictException('This user already exists')
      }
      const hashPass = await this.crypto.encrypt(password);
      const newAuth = await this.authModel.create({
        username,
        password: hashPass,
      });

      return successMessage(newAuth, 201);
    } catch (error) {
      handleError(error);
    }
  }

  // Login function
  async login(loginDto: loginDto) {
    try {
      const { password, username } = loginDto;
      const authUser = await this.authModel.findOne({ where: { username } });
      if (!authUser) throw new NotFoundException('Foydalanuvchi topilmadi');

      const pass = await this.crypto.decrypt(password, authUser.password);
      if (!pass) throw new NotFoundException("Login yoki parol noto'g'r");
    
      const payload = { role:'admin' };
      const token = await this.tokenService.generateAccesToken(payload);

      return successMessage({ authUser, token });
    } catch (error) {
      handleError(error);
    }
  }
}
 
