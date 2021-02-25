import { Test, TestingModule } from '@nestjs/testing';
import { ExperimentsService } from './experiments.service';
import { ExperimentsRepository } from './experiments.repository';
import { v4 as uuid } from 'uuid';

describe('ExperimentsService', () => {
  let service: ExperimentsService;
  let repository: ExperimentsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExperimentsService, ExperimentsRepository],
    }).compile();

    service = module.get<ExperimentsService>(ExperimentsService);
    repository = module.get<ExperimentsRepository>(ExperimentsRepository);
  });

  describe('Experiments Service', () => {
    it('createExperiment should return an experiment', async () => {
      const itemId = uuid();
      const experimentData = {
        title: 'Experiment Goal',
        hypothesis: 'Experiment Hypothesis',
      };

      const createExperiment = jest.fn().mockImplementation(() => {
        return Promise.resolve({ id: itemId });
      });

      const getSingleExperiment = jest.fn().mockImplementation(() => {
        return Promise.resolve({ id: itemId, ...experimentData });
      });

      jest
        .spyOn(repository, 'createExperiment')
        .mockImplementation(createExperiment);
      jest
        .spyOn(repository, 'getSingleExperiment')
        .mockImplementation(getSingleExperiment);

      const experiment = await service.createExperiment(experimentData);

      expect(experiment.id).toBe(itemId);
      expect(experiment.title).toBe(experimentData.title);
      expect(experiment.hypothesis).toBe(experimentData.hypothesis);
    });
  });
});
