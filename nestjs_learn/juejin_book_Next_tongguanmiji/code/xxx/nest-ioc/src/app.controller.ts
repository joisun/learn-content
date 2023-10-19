import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { privateDecrypt } from 'crypto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('person') private readonly person: { name: string; age: number },
    @Inject('person2')
    private readonly person2: {
      name: string;
      desc: string;
    },
    @Inject('person3') private readonly person3: { name: string; desc: string },
  ) {}

  @Get()
  getHello(): string {
    return (
      this.appService.getHello() +
      this.person.name +
      this.person.age +
      this.person2.desc +
      this.person2.name +
      this.person3.desc
    );
  }
}
