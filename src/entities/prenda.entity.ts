import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';


@Schema()
export class Prenda extends Document {
    @Prop({ type: String, required: true})
    id: string;

    @Prop({ type: String })
    nombre: string;

    @Prop({ type: String })
    precio: string;

    @Prop({ type: String })
    descripcion: string;
    
    @Prop({ type: Number })
    existencias: number;

    @Prop({ type: [String] })
    colores: string[];

    @Prop({ type: [String] })
    tallas: string[];

    @Prop({ type: [String] })
    imagen: string[];

    @Prop({ type: [String] })
    categorias: string[];

    @Prop({ type: [String] })
    personalizacion: string[];

    @Prop({ type: String })
    estado: string;


}

export const PrendaSchema = SchemaFactory.createForClass(Prenda);
