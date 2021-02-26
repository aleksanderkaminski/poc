import { ExperimentStatus } from '../enums/experiments.enums';

export class Experiment {
  id: string;
  title: string;
  hypothesis: string;
  status: ExperimentStatus;
}
