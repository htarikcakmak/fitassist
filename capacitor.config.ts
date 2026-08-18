import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fitassist.app',
  appName: 'FitAssist',
  webDir: 'dist', 
  server: {
    cleartext: true
  }
};

export default config;