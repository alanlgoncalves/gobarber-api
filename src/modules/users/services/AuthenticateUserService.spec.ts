import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../provider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

describe('CreateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const name = 'John Doe';
    const email = 'johndoe@example.dev';
    const password = '123456';

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const response = await authenticateUser.execute({
      email,
      password,
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'johndoe@example.dev',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const email = 'johndoe@example.dev';

    await createUser.execute({
      name: 'John Doe',
      email,
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
