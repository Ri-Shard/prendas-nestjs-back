import { PartialType } from '@nestjs/mapped-types';
import { CreatePrendaDto } from './createPrenda.dto';

export class UpdatePrendaDto extends PartialType(CreatePrendaDto) {}