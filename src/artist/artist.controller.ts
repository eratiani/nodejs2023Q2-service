import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { CreateArtistDto, UpdateArtistDto } from 'src/dto';
import { Artist } from 'src/entities';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Add new artist',
    description: 'Add new artist information',
  })
  @ApiCreatedResponse({
    description: 'artist is added',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Get artists list',
    description: 'Gets all library artists list',
  })
  @ApiOkResponse({
    description: 'The resources were returned successfully',
    type: [Artist],
  })
  @Get()
  async findAll() {
    return this.artistService.findAll();
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Get single artist by id',
    description: 'Gets single artist by id',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({
    description: 'The artist was returned successfully',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, artist "id" is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'artist was not found',
    status: HttpStatus.NOT_FOUND,
  })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.findOne(id);
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Update artist information',
    description: 'Update library artist information by UUID',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({
    description: 'The artist information has been updated',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, artist "id" is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'artist was not found' })
  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Delete artist',
    description: 'Delete artist from library',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Deleted artist successfully',
  })
  @ApiNotFoundResponse({ description: 'artist was not found' })
  @ApiBadRequestResponse({
    description: 'Bad Request, artist "id" is invalid (not uuid)',
  })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.remove(id);
  }
}
