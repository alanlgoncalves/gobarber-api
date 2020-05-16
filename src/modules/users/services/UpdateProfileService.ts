import { inject, injectable } from 'tsyringe';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ user_id, name, email }: IRequest): Promise<void> {}
}

export default UpdateProfileService;
