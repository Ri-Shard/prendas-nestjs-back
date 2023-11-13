import { Module } from '@nestjs/common';
import { PrendasService } from './prendas.service';
import { PrendasController } from './prendas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Prenda, PrendaSchema } from 'src/entities/prenda.entity';
import { PrendaRepository } from 'src/repositories/prenda.repository';

@Module({
 controllers: [PrendasController],
 imports: [MongooseModule.forFeature([{ name: Prenda.name, schema: PrendaSchema }])],
 providers: [PrendasService, PrendaRepository],
 exports: [PrendasService, PrendaRepository],
})
export class PrendasModule {}