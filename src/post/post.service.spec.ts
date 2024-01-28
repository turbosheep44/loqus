import { createMock } from '@golevelup/ts-jest';
import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  CreatePostDto,
  PageInfo,
  SortDirection,
  SortField,
  SortInfo,
  UpdatePostDto,
} from './post.dto';
import { Post } from './post.schema';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let model: Model<Post>;

  const id: string = '0000';
  const systemTime = new Date(2000, 1, 1);

  beforeEach(async () => {
    model = createMock<Model<Post>>();
    service = new PostService(model);
  });

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(systemTime);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('findAll', () => {
    const search = '';
    const page: PageInfo = { page: 1, pageSize: 1 };
    const sort: SortInfo = { sortBy: 'createdAt', sortDirection: 'asc' };

    async function doFindAll(
      page: PageInfo,
      search: string | null,
      sort: SortInfo,
    ): Promise<Record<string, jest.Mock>> {
      const execResult = ['post0', 'post1'];
      const queryBuilder: Record<string, jest.Mock> = {
        sort: jest.fn(() => queryBuilder),
        skip: jest.fn(() => queryBuilder),
        limit: jest.fn(() => queryBuilder),
        where: jest.fn(() => queryBuilder),
        exec: jest.fn(() => execResult),
      };
      jest.spyOn(model, 'find').mockReturnValue(queryBuilder as never);

      const result = await service.findAll(page, search, sort);

      expect(result).toStrictEqual(execResult);
      expect(queryBuilder.sort).toHaveBeenCalledTimes(1);
      expect(queryBuilder.skip).toHaveBeenCalledTimes(1);
      expect(queryBuilder.limit).toHaveBeenCalledTimes(1);
      expect(queryBuilder.where).toHaveBeenCalledTimes(1);
      expect(queryBuilder.exec).toHaveBeenCalledTimes(1);
      return queryBuilder;
    }

    it('should find all posts and return them', async () => {
      await doFindAll(page, search, sort);
    });

    test.each([
      [1, 5],
      [2, 5],
      [2, 8],
    ])(
      'should set the pagination parameters correctly correct page [page=%d, pageSize=%d]',
      async (page, pageSize) => {
        const query = await doFindAll({ page, pageSize }, search, sort);
        expect(query.skip).toHaveBeenCalledWith((page - 1) * pageSize);
        expect(query.limit).toHaveBeenCalledWith(pageSize);
      },
    );

    test.each([
      [
        'search',
        {
          $or: [
            { title: { $regex: '.*search.*', $options: 'i' } },
            { content: { $regex: '.*search.*', $options: 'i' } },
          ],
        },
      ],
      ['', {}],
      [null, {}],
    ])(
      'should set the search parameters correctly [search=%s]',
      async (search, whereClause) => {
        const query = await doFindAll(page, search, sort);
        expect(query.where).toHaveBeenCalledWith(whereClause);
      },
    );

    test.each<[SortField, SortDirection]>([
      ['title', 'asc'],
      ['createdAt', 'desc'],
    ])(
      'should set the sort parameters correctly [sort=%s, direction=%s]',
      async (sortBy, sortDirection) => {
        const query = await doFindAll(page, search, { sortBy, sortDirection });
        expect(query.sort).toHaveBeenCalledWith({ [sortBy]: sortDirection });
      },
    );
  });

  describe('find', () => {
    it('should find the post and return it', async () => {
      const execResult = 'post';
      const find = { exec: jest.fn(() => Promise.resolve(execResult)) };
      jest.spyOn(model, 'findById').mockReturnValue(find as never);

      const result = await service.find(id);

      expect(result).toStrictEqual(execResult);
      expect(model.findById).toHaveBeenCalledTimes(1);
      expect(model.findById).toHaveBeenCalledWith(id);
    });

    it('should throw an error if the post is not found', async () => {
      const find = { exec: jest.fn(() => Promise.resolve(null)) };
      jest.spyOn(model, 'findById').mockReturnValue(find as never);

      await expect(service.find(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('save', () => {
    it('should create the new post and save it', async () => {
      const saveResult = 'saved value';
      const dto: CreatePostDto = {
        title: 'title',
        content: 'content',
        author: 'author',
      };
      const create = { save: jest.fn(() => Promise.resolve(saveResult)) };
      jest.spyOn(model, 'create').mockReturnValue(create as never);

      const result = await service.create(dto);

      expect(result).toStrictEqual(saveResult);
      expect(model.create).toHaveBeenCalledTimes(1);
      expect(model.create).toHaveBeenCalledWith({
        ...dto,
        createdAt: systemTime,
      });
    });
  });

  describe('update', () => {
    const dto: UpdatePostDto = {
      title: 'updated-title',
      content: 'updated-content',
    };

    it('should update the post, save it and return the result', async () => {
      const saveResult = 'saved value';
      const post = { title: '', content: '', save: jest.fn(() => saveResult) };
      const find = { exec: jest.fn(() => Promise.resolve(post)) };
      jest.spyOn(model, 'findById').mockReturnValue(find as never);

      const result = await service.update(id, dto);

      expect(result).toStrictEqual(saveResult);
      expect(model.findById).toHaveBeenCalledTimes(1);
      expect(model.findById).toHaveBeenCalledWith(id);
      expect(post.title).toStrictEqual(dto.title);
      expect(post.content).toStrictEqual(dto.content);
      expect(post.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if the post is not found', async () => {
      const find = { exec: jest.fn(() => Promise.resolve(null)) };
      jest.spyOn(model, 'findById').mockReturnValue(find as never);

      await expect(service.update(id, dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete the item and return nothing', async () => {
      jest
        .spyOn(model, 'findByIdAndDelete')
        .mockReturnValue(Promise.resolve({}) as never);

      await service.delete(id);

      expect(model.findByIdAndDelete).toHaveBeenCalledTimes(1);
      expect(model.findByIdAndDelete).toHaveBeenCalledWith(id);
    });
  });
});
