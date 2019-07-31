import {Singleton} from './utils/singleton';

App({
  onLaunch(options) {
    Singleton.Token.verify();
  }
})