import { ApiProperty } from '@nestjs/swagger';

export class CreateExperimentDto {
  @ApiProperty({
    description: 'Goal of the experiment',
    type: String,
  })
  title: string;

  @ApiProperty({
    description: 'Hypothesis of the experiment',
    type: String,
  })
  hypothesis: string;
}
