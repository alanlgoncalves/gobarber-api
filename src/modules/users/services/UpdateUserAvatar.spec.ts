import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to change user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

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
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const avatarFilename = 'avatar.jpg';

    expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFileName: avatarFilename,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

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
