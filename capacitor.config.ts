import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fitassist.app',
  appName: 'FitAssist',
  webDir: 'build', // veya dist
  server: {
    cleartext: true // Android'in HTTP isteklerine izin verir
  }
};

export default config;