import { Injectable } from '@nestjs/common';
import { CreateExperimentDto } from './dto/create-experiment.dto';
import { ExperimentsRepository } from './experiments.repository';

@Injectable()
export class ExperimentsService {
  constructor(private experimentsRepository: ExperimentsRepository) {}

  async findExperiments({ status }) {
    return await this.experimentsRepository.getExperiments({ status });
  }

  async createExperiment(experiment: CreateExperimentDto) {
    const createdExperimentId = await this.experimentsRepository.createExperiment(
      experiment,
    );
    return await this.experimentsRepository.getSingleExperiment({
      id: createdExperimentId,
    });
  }
}
