import ISendMailDTO from '@shared/container/providers/MailProvider/ISendMailDTO';

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
