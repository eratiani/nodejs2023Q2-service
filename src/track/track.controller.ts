import { Album, Track } from 'src/entities';
import { TrackService } from './track.service';
import {
  Controller,
  Header,
  Post,
  Body,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
  HttpCode,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { CreateTrackDto, UpdateTrackDto } from 'src/dto';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Add new track',
    description: 'Add new track information',
  })
  @ApiCreatedResponse({
    description: 'track is created',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Get tracks list',
    description: 'Gets all library tracks list',
  })
  @ApiOkResponse({
    description: 'The resources were returned successfully',
    type: [Track],
  })
  @Get()
  async findAll() {
    return this.trackService.findAll();
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Get single track by id',
    description: 'Gets single track by id',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({
    description: 'The track was returned successfully',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, track "id" is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'track was not found',
    status: HttpStatus.NOT_FOUND,
  })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.findOne(id);
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Update track information',
    description: 'Update library track information by UUID',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({
    description: 'The track has been updated',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, track "id" is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'track was not found' })
  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Delete album',
    description: 'Delete album from library',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Deleted album successfully',
  })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  @ApiBadRequestResponse({
    description: 'Bad Request, album "id" is invalid (not uuid)',
  })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.remove(id);
  }
}
