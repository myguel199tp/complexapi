import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CreateForumThreadDto } from './dto/create-forum-thread.dto';
import { ForumThreadsService } from './forum-threads.service';

@Controller('forum')
export class ForumThreadsController {
  constructor(private readonly forumService: ForumThreadsService) {}

  @Post()
  createThread(@Body() createForumThreadDto: CreateForumThreadDto) {
    return this.forumService.createThread(createForumThreadDto);
  }

  @Post(':threadId/polls/:pollIndex/vote')
  vote(
    @Param('threadId') threadId: string,
    @Param('pollIndex') pollIndex: number,
    @Query('optionId') optionId: string,
  ) {
    return this.forumService.vote(optionId, threadId, pollIndex);
  }

  @Get()
  getThreads() {
    return this.forumService.getThreads();
  }
}
