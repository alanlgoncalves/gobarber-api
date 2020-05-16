import ISendMailDTO from '@shared/container/providers/MailProvider/ISendMailDTO';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}
