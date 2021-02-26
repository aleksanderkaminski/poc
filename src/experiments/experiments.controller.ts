import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  Query,
  HttpCode,
} from '@nestjs/common';
import { ExperimentsService } from './experiments.service';
import { CreateExperimentDto } from './shared/dto/create-experiment.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('experiments')
export class ExperimentsController {
  constructor(private readonly experimentsService: ExperimentsService) {}

  @ApiResponse({ status: HttpStatus.OK, description: 'OK' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Service Error',
  })
  @Post('/')
  @HttpCode(200)
  async createExperiment(@Body() createExperimentDto: CreateExperimentDto) {
    const createdExperiment = await this.experimentsService.createExperiment(
      createExperimentDto,
    );
    return createdExperiment;
  }
  @ApiResponse({ status: HttpStatus.OK, description: 'OK' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Service Error',
  })
  @Get('/')
  async getExperiments(@Query() { status }) {
    return await this.experimentsService.findExperiments({ status });
  }
}
