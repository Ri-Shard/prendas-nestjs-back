import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';
import { UpdatePrendaDto } from './dto/updatePrenda.dto';

import { PrendaRepository } from '../repositories/prenda.repository';
import { CreatePrendaDto } from './dto/createPrenda.dto';


@Injectable()
export class PrendasService {
    constructor(private prendaRepository: PrendaRepository) {}

    async createPrenda(createprendaDto: CreatePrendaDto, session: ClientSession) {
        return await this.prendaRepository.createPrenda(createprendaDto, session);
    }

    async getPrendaById(prendaId: String) {
        return await this.prendaRepository.getPrendaById(prendaId);
    }

    async getPrendas(getQueryDto: GetQueryDto) {
        return await this.prendaRepository.getPrendas(getQueryDto);
    }

    async updatePrenda(UpdatePrendaDto: UpdatePrendaDto, session: ClientSession) {
        return await this.prendaRepository.updatePrenda(UpdatePrendaDto, session);
    }
}
