// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { db } from './index';
import { migrate } from 'drizzle-orm/neon-http/migrator';

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: 'src/db/migrations',
    });
    console.log('数据开始转换。。。。');
  } catch (error) {
    console.error('数据转换错误！: ', error);
    process.exit(1);
  }
};

main();
