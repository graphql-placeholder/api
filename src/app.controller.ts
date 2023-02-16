import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    // redirect to GraphQL playground
    return 'Hello';
    // return res.redirect('/graphql');
  }
}
