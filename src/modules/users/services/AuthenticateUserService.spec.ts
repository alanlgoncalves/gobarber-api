import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const name = 'John Doe';
    const email = 'johndoe@example.dev';
    const password = '123456';

    const user = await fakeUsersRepository.create({
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
    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.dev',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const email = 'johndoe@example.dev';

    await fakeUsersRepository.create({
      name: 'John Doe',
      email,
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
