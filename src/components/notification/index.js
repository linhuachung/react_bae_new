import { message } from 'antd'
import errors from '@/languages/error-messages/jp.json'

class Notification {
  static success(text) {
    message.success(text)
  }

  static warning(text) {
    message.warning(text)
  }

  static error(text) {
    message.error(errors['error-messages'][text] && this.translate ? this.translate(`error-messages.${text}`) : text)
  }
}

export default Notification
