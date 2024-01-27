import { mock } from 'jest-mock-extended';
import { PostController } from './post.controller';
import { CreatePostDto, PageInfo, SortInfo, UpdatePostDto } from './post.dto';
import { Post } from './post.schema';
import { PostService } from './post.service';

const POSTS: Post[] = [
  { title: '', content: '', author: '', createdAt: new Date() },
  { title: '', content: '', author: '', createdAt: new Date() },
];

describe('PostController', () => {
  let controller: PostController;
  let service: PostService;

  beforeEach(async () => {
    // nest has some testing utilities but since we are writing unit tests
    // I think it is better practice to mock dependencies and manually
    // instantiate the class

    service = mock<PostService>();
    controller = new PostController(service);
  });

  it('findAll should return the queried posts', async () => {
    const page: PageInfo = { page: 1, pageSize: 10 };
    const search: string = '';
    const sort: SortInfo = { sortBy: 'createdAt', sortDirection: 'desc' };
    jest.spyOn(service, 'findAll').mockImplementation(async () => POSTS);

    const result = await controller.findAll(page, search, sort);

    expect(result).toBe(POSTS);
    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(service.findAll).toHaveBeenCalledWith(page, search, sort);
  });

  it('create should return the created post', async () => {
    const dto: CreatePostDto = { title: '', content: '', author: '' };
    jest.spyOn(service, 'create').mockImplementation(async () => POSTS[0]);

    const result = await controller.create(dto);

    expect(result).toBe(POSTS[0]);
    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('find should return the post', async () => {
    const id = '0000';
    jest.spyOn(service, 'find').mockImplementation(async () => POSTS[0]);

    const result = await controller.find(id);

    expect(result).toBe(POSTS[0]);
    expect(service.find).toHaveBeenCalledTimes(1);
    expect(service.find).toHaveBeenCalledWith(id);
  });

  it('update should return the post', async () => {
    const id = '0000';
    const dto: UpdatePostDto = { title: '', content: '' };
    jest.spyOn(service, 'update').mockImplementation(async () => POSTS[0]);

    const result = await controller.update(id, dto);

    expect(result).toBe(POSTS[0]);
    expect(service.update).toHaveBeenCalledTimes(1);
    expect(service.update).toHaveBeenCalledWith(id, dto);
  });

  it('delete should return nothing', async () => {
    const id = '0000';
    jest.spyOn(service, 'delete').mockImplementation(async () => void 0);

    await controller.delete(id);

    expect(service.delete).toHaveBeenCalledTimes(1);
    expect(service.delete).toHaveBeenCalledWith(id);
  });
});
