import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../dto/getQueryDto';
import { Prenda } from '../entities/prenda.entity';
import { UpdatePrendaDto } from 'src/prendas/dto/updatePrenda.dto';
import { CreatePrendaDto } from 'src/prendas/dto/createPrenda.dto';


export class PrendaRepository {
    constructor(@InjectModel(Prenda.name) private readonly prendaModel: Model<Prenda>) {}

    async createPrenda(createPrendaDto: CreatePrendaDto, session: ClientSession) {
        let prenda = new this.prendaModel({
            _id:createPrendaDto._id,
            nombre: createPrendaDto.nombre,
            precio:createPrendaDto.precio,
            descripcion:createPrendaDto.descripcion,
            colores:createPrendaDto.colores,
            imagen:createPrendaDto.imagen,
            categorias:createPrendaDto.categorias,
            personalizacion:createPrendaDto.personalizacion,
            estado:createPrendaDto.estado
        });
        try {
            prenda = await prenda.save({ session });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return prenda;
    }

    async updatePrenda(updatePrenda: UpdatePrendaDto, session: ClientSession) {
        const actualDate = new Date();
        actualDate.toUTCString();

        const updateData = {
            estado: updatePrenda.estado,
        };

        let prenda;
        try {
            prenda = await this.prendaModel
                .findOneAndUpdate({ _id: updatePrenda._id }, updateData, {
                    new: true,
                })
                .session(session)
                .exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!prenda) {
            throw new ConflictException('Error trying to update prenda');
        }

        return prenda;
    }

    async getPrendas(query: GetQueryDto) {
        return await this.prendaModel.find().exec();

    }

    async getPrendaById(id: String) {
        let product;
        try {
            product = await this.prendaModel.findById(id).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!product) {
            throw new NotFoundException('La prenda no existe');
        }

        return product;
    }
}