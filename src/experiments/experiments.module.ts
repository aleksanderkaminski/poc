import { Module } from '@nestjs/common';
import { ExperimentsService } from './experiments.service';
import { ExperimentsController } from './experiments.controller';
import { ExperimentsRepository } from './experiments.repository';

@Module({
  controllers: [ExperimentsController],
  providers: [ExperimentsService, ExperimentsRepository],
})
export class ExperimentsModule {}
