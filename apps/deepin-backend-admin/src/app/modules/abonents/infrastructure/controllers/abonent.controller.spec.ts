import { Test, TestingModule } from '@nestjs/testing';
import { AbonentController } from './abonent.controller';

describe('AbonentController', () => {
  let controller: AbonentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbonentController],
    }).compile();

    controller = module.get<AbonentController>(AbonentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
