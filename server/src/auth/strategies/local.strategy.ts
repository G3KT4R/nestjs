import { Strategy } from 'passport-local'; // Используется для создания локальной стратегии аутентификации
import { PassportStrategy } from '@nestjs/passport'; // Базовый класс для создания собственных стратегий аутентификации в NestJS
import { Injectable, UnauthorizedException } from '@nestjs/common'; // Используется для внедрения зависимостей, а UnauthorizedException генерирует исключение, если аутентификация не удалась
import { AuthService } from '../auth.service';

// Этот код обеспечивает механизм для аутентификации пользваетелй на основе их имени пользователя и пароля, что позволяет защищать доступ к приложениям на основе NestJS.

@Injectable()
// Класс LocalStrategy наследует PassportStrategy(Strategy), что позволяет ему использовать функционал лок. стартегии
export class LocalStrategy extends PassportStrategy(Strategy) {
  // Внедрение AuthService, для возможности вызывать его методы для проверки пользователя
  constructor(private authService: AuthService) {
    // Работай не с параметром username, который находится у тебя под капотом (в коробка), а переименуй его в email и работай с ним.
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    // Вызов метода validateUser для проверки наличия пользователя с указанными учетными данными
    const user = await this.authService.validateUser(email, password);
    // Если пользователь не найден, то выбрасывается исключение UnauthorizedException. В противном случае, возвращается объект user/
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
