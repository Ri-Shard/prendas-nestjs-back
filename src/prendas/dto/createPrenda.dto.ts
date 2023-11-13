import { IsOptional } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreatePrendaDto {

    _id: string;
    @IsOptional()
    nombre: string;
    @IsOptional()   
    precio: string;
    @IsOptional()
    descripcion: string;
    @IsOptional()
    colores: [string];
    @IsOptional()
    imagen: [string];
    @IsOptional()
    categorias: [string];
    @IsOptional()
    personalizacion: [string];
    @IsOptional()
    estado: string;

}
