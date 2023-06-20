import { Global, Module } from '@nestjs/common';
import { CatsController } from './cat.controller';
import { CatsService } from './cat.service';

@Global() //permite que sea inyectado out--of-the-box.
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], // esto es para exportar el catService y poder inyectarlo en otros modulos
})
export class CatModule {
  //esto es para que esté disponible dentro del módulo y se pueda utilizar en otras partes del código.
  constructor(private catsService: CatsService) {}
}
