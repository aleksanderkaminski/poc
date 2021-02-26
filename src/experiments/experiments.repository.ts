import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { InternalServerErrorException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateExperimentDto } from './shared/dto/create-experiment.dto';
import { ExperimentStatus } from './shared/enums/experiments.enums';

let dbclient;
if (process.env.IS_OFFLINE === 'true') {
  dbclient = new DynamoDBClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  });
} else {
  dbclient = new DynamoDBClient({ region: 'us-east-1' });
}

type getSingleExperimentParams = {
  id: string;
};

type getExperimentsParams = {
  status: ExperimentStatus;
};

export class ExperimentsRepository {
  async getExperiments({ status }: getExperimentsParams) {
    const params = {
      FilterExpression: 'experimentStatus = :experimentStatus',
      ExpressionAttributeValues: {
        ':experimentStatus': { S: status },
      },
      TableName: 'ExperimentsTable',
      ProjectionExpression: 'title, hypothesis, experimentStatus, id',
    };

    try {
      const results = await dbclient.send(new ScanCommand(params));
      return results.Items.map((item) => unmarshall(item));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getSingleExperiment({ id }: getSingleExperimentParams) {
    try {
      const getItemParams = {
        TableName: 'ExperimentsTable',
        Key: {
          id: { S: id },
        },
      };
      const createdExperiment = await dbclient.send(
        new GetItemCommand(getItemParams),
      );
      return unmarshall(createdExperiment.Item);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createExperiment(createExperimentDto: CreateExperimentDto) {
    const itemId = uuid();
    const Item = {
      TableName: 'ExperimentsTable',
      Item: marshall({
        id: itemId,
        experimentStatus: ExperimentStatus.Draft,
        ...createExperimentDto,
      }),
    };
    try {
      await dbclient.send(new PutItemCommand(Item));
      return itemId;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
