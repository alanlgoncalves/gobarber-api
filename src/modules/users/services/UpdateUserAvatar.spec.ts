import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to change user avatar', async () => {
    const avatarFilename = 'avatar.jpg';

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.dev',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: avatarFilename,
    });

    expect(user.avatar).toBe(avatarFilename);
  });

  it('should not be able to change user avatar with non exiting user', async () => {
    const avatarFilename = 'avatar.jpg';

    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFileName: avatarFilename,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const oldAvatarFilename = 'avatar.jpg';
    const newAvatarFilename = 'avatar.jpg';

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.dev',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: oldAvatarFilename,
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: newAvatarFilename,
    });

    expect(deleteFile).toHaveBeenCalledWith(oldAvatarFilename);
    expect(user.avatar).toBe(newAvatarFilename);
  });
});
