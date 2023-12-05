import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'person',
      useValue: {
        name: 'jay',
        age: 18,
      },
    },
    {
      provide: 'person2',
      useFactory(person: { name: string }, appService: AppService) {
        return {
          name: person.name + new Date().toTimeString(),
          desc: appService.getHello(),
        };
      },
      inject: ['person', AppService],
    },
    {
      provide: 'person3',
      useExisting: 'person2',
    },
  ],
})
export class AppModule {}
