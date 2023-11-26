import { Test, TestingModule } from '@nestjs/testing';

import { of } from 'rxjs';

import { firstValueFrom } from 'rxjs';
import { PrendasService } from './prendas.service';
import { PrendaRepository } from '../repositories/prenda.repository';
import { Prenda } from 'src/entities/prenda.entity';
import { GetQueryDto } from 'src/dto/getQueryDto';


describe('PrendasService', () => {
 let service: PrendasService;
 let repository: PrendaRepository;

 beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrendasService,
        {
          provide: PrendaRepository,
          useValue: {
            getPrendas: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PrendasService>(PrendasService);
    repository = module.get<PrendaRepository>(PrendaRepository);
 });

 it('should be defined', () => {
    expect(service).toBeDefined();
 });

 describe('getPrendas', () => {
    it('Debe retornar un array de prendas', async () => {
      const query: GetQueryDto = new GetQueryDto;
      const mockPrenda: Prenda = new Prenda();
      mockPrenda._id = '1';
      mockPrenda.nombre ='nombre prenda';
      mockPrenda.precio = '100000';
      mockPrenda.descripcion = 'descripcion de la prenda' ;
      mockPrenda.existencias = 2;
      mockPrenda.colores=[],
      mockPrenda.tallas=[],
      mockPrenda.imagen=[],
      mockPrenda.categorias=[],
      mockPrenda.personalizacion=[],
      (repository.getPrendas as jest.Mock).mockReturnValue(of([mockPrenda]));

      const prendas = await service.getPrendas(query);
      expect(Array.isArray(prendas)).toBe(true);
      expect(prendas).toContainEqual(mockPrenda);
    });
});


});