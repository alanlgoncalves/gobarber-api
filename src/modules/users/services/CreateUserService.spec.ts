import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const name = 'John Doe';
    const email = 'johndoe@example.dev';

    const user = await createUserService.execute({
      name,
      email,
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe(name);
    expect(user.email).toBe(email);
  });

  it('should not be able to create a new user with same email from another', async () => {
    const name = 'John Doe';
    const email = 'johndoe@example.dev';

    await createUserService.execute({
      name,
      email,
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name,
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
