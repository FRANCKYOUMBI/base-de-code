import { Controller, Get } from '@nestjs/common';
import { Public } from '@/auths/decorators/public.decorator';

@Controller('')
export class CoreController {
  @Get('/healthcheck')
  @Public()
  healthcheck() {
    return 'OK';
  }
}
