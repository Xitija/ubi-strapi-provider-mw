import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchRequestDto } from './dto/search-request.dto';
import { BenefitsService } from './benefits.service';
import { AllExceptionsFilter } from 'src/common/filters/exception.filters';
import { InitRequestDto } from './dto/init-request.dto';
import { ConfirmRequestDto } from './dto/confirm-request.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SearchBenefitsDto } from './dto/search-benefits.dto';
import { StatusRequestDto } from './dto/status-request.dto';

@UseFilters(new AllExceptionsFilter())
@ApiTags('Benefits') // Grouping the APIs under the "Benefits" tag in Swagger
@Controller('benefits')

export class BenefitsController {
  constructor(private readonly benefitsService: BenefitsService) { }

  @ApiOperation({
    summary: 'Get Benefits by ID',
    description: 'Fetch benefits by their unique identifier.',
  })
  @Get('getById/:docid')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  getBenefitsById(@Param('docid') id: string): any {
    return this.benefitsService.getBenefitsById(id);
  }

  @Post('search')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get Benefits for given provider user',
    description: 'Search for benefits based on the logged in provider user.',
  })
  searchBenefits(@Body() body: SearchBenefitsDto, @Req() req: Request): any {
    return this.benefitsService.getBenefits(req, body);
  }

  @Post('dsep/search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Search Benefits',
    description:
      'Search for benefits based on the provided context and message.',
  })
  searchBenefitsNetwork(@Body() searchRequestDto: SearchRequestDto): any {
    return this.benefitsService.searchBenefits(searchRequestDto);
  }

  @ApiOperation({
    summary: 'Get Benefits by ID',
    description: 'Fetch benefits by their unique identifier.',
  })
  @Post('dsep/select')
  @HttpCode(HttpStatus.OK)
  selectBenefitsNetwork(@Body() body): any {
    return this.benefitsService.selectBenefitsById(body);
  }

  @Post('dsep/init')
  @ApiOperation({
    summary: 'Initialize',
    description: 'Handles the initialization based on the provided data.',
  })
  async init(@Body() initRequestDto: InitRequestDto) {
    return this.benefitsService.init(initRequestDto);
  }

  @Post('dsep/confirm')
  @ApiOperation({
    summary: 'Confirm',
    description: 'Handles the confirmation based on the provided data.',
  })
  async confirm(@Body() confirmRequestDto: ConfirmRequestDto) {
    return this.benefitsService.confirm(confirmRequestDto);
  }

  @Post('dsep/status')
  @ApiOperation({
    summary: 'Status',
    description: 'Handles the status based on the provided data.',
  })
  async status(@Body() statusRequestDto: StatusRequestDto) {
    return this.benefitsService.status(statusRequestDto);
  }
}
