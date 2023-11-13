import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { PrendasService } from './prendas.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { CreatePrendaDto } from './dto/createPrenda.dto';
import { UpdatePrendaDto } from './dto/updatePrenda.dto';
import { GetQueryDto } from 'src/dto/getQueryDto';

@Controller('prendas')
export class PrendasController {
  constructor( private  prendasService: PrendasService, @InjectConnection() private readonly mongoConnection: Connection) {}


  @Post('/createPrenda')
  async createPrenda(@Body() createPrendaDto: CreatePrendaDto, @Res() res: Response) {
      const session = await this.mongoConnection.startSession();
      session.startTransaction();
      try {
          const newPrenda: any = await this.prendasService.createPrenda(createPrendaDto, session);
          await session.commitTransaction();
          return res.status(HttpStatus.OK).send(newPrenda);
      } catch (error) {
          await session.abortTransaction();
          throw new BadRequestException(error);
      } finally {
          session.endSession();
      }
  }

  @Put('/updatePrenda/:id')
  async updatePrenda(@Param('id') id: String, @Body() updatePrendaDto: UpdatePrendaDto, @Res() res: Response) {
      const session = await this.mongoConnection.startSession();
      session.startTransaction();
      try {
          const newPrenda: any = await this.prendasService.updatePrenda(updatePrendaDto, session);
          await session.commitTransaction();
          return res.status(HttpStatus.OK).send(newPrenda);
      } catch (error) {
          await session.abortTransaction();
          throw new BadRequestException(error);
      } finally {
          session.endSession();
      }
  }

  @Get('/getPrendaById/:id')
  async getProductById(@Param('id') id: String, @Res() res: Response) {
      const storage: any = await this.prendasService.getPrendaById(id);
      return res.status(HttpStatus.OK).send(storage);
  }

  @Get('/getPrendas')
  async getAllPrendas(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
      const storages: any = await this.prendasService.getPrendas(getQueryDto);
      return res.status(HttpStatus.OK).send(storages);
  }

}




