import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fitassist.aab',
  appName: 'FitAssist',
  webDir: 'dist', 
  server: {
    cleartext: true
  }
};

export default config;