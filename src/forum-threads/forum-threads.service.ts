import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateForumThreadDto } from './dto/create-forum-thread.dto';
import { ForumThread, ForumThreadDocument } from './shema/forumThread.shema';
import { PollOption } from './shema/pollOption.shema';

@Injectable()
export class ForumThreadsService {
  constructor(
    @InjectModel(ForumThread.name)
    private forumThreadModel: Model<ForumThreadDocument>,
  ) {}

  async createThread(
    createForumThreadDto: CreateForumThreadDto,
  ): Promise<ForumThread> {
    const thread = new this.forumThreadModel(createForumThreadDto);
    return thread.save();
  }

  async vote(
    optionId: string,
    threadId: string,
    pollIndex: number,
  ): Promise<ForumThread> {
    const thread = await this.forumThreadModel.findById(threadId);
    if (!thread) throw new Error('Thread not found');

    const pollOption = thread.polls[pollIndex].options.find(
      (option) => option.id.toString() === optionId,
    );
    if (!pollOption) throw new Error('Option not found');

    pollOption.votes += 1;
    return thread.save();
  }

  async getThreads(): Promise<ForumThread[]> {
    return this.forumThreadModel.find().exec();
  }
}
