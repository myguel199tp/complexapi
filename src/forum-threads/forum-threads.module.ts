import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ForumThread, ForumThreadSchema } from './shema/forumThread.shema';
import { ForumThreadsController } from './forum-threads.controller';
import { ForumThreadsService } from './forum-threads.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ForumThread.name, schema: ForumThreadSchema },
    ]),
  ],
  controllers: [ForumThreadsController],
  providers: [ForumThreadsService],
})
export class ForumThreadsModule {}
