import { Test, TestingModule } from '@nestjs/testing';
import { ExperimentsController } from './experiments.controller';
import { ExperimentsService } from './experiments.service';
import { ExperimentsRepository } from './experiments.repository';
import { ExperimentStatus } from './experiments.enums';

describe('ExperimentsController', () => {
  let controller: ExperimentsController;
  let service: ExperimentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExperimentsController],
      providers: [ExperimentsService, ExperimentsRepository],
    }).compile();

    controller = module.get<ExperimentsController>(ExperimentsController);
    service = module.get<ExperimentsService>(ExperimentsService);
  });

  describe('Experiments Getters', () => {
    it('Get should return an array of data', async () => {
      const result = ['test'];
      jest
        .spyOn(service, 'findExperiments')
        .mockImplementation(async () => result);

      const data = await controller.getExperiments({
        status: ExperimentStatus.Draft,
      });

      expect(data).toBe(result);
    });
  });
});
