// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { NextApiRequest, NextApiResponse } from 'next';

const kindeCallback = async (req: NextApiRequest, res: NextApiResponse) => {
  const code = req.query.code;
  const redirectUri = req.query.redirect_uri;

  console.log('授权码：', code);
  console.log('重定向URI：', redirectUri);

  // ... 其他的代码 ...
};

export default kindeCallback;
