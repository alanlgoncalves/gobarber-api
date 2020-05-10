import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../provider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

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
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const name = 'John Doe';
    const email = 'johndoe@example.dev';

    await createUserService.execute({
      name,
      email,
      password: '123456',
    });

    expect(
      createUserService.execute({
        name,
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
