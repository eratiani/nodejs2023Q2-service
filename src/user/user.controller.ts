import { User } from 'src/entities';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from 'src/dto';
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

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Add new user',
    description: 'Add new user information',
  })
  @ApiCreatedResponse({
    description: 'user is created',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad request, body does not contain required fields',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Get user list',
    description: 'Gets all library user list',
  })
  @ApiOkResponse({
    description: 'The resources were returned successfully',
    type: [User],
  })
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Get single user by id',
    description: 'Gets single user by id',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({
    description: 'The user was returned successfully',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, user "id" is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    description: 'user was not found',
    status: HttpStatus.NOT_FOUND,
  })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Header('Content-Type', 'application/json')
  @ApiOperation({
    summary: 'Update user information',
    description: 'Update library user information by UUID',
  })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiOkResponse({
    description: 'The user has been updated',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request, user "id" is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'user was not found' })
  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(updateUserDto, id);
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
    return this.userService.remove(id);
  }
}
