// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
type Props = {
  result: {
      data?: {
          message?: string,
      },
      serverError?: string,
      validationErrors?: Record<string, string[] | undefined>,
  },
}

const MessageBox = ({
  type,
  content,
}: {
  type: 'success' | 'error' | 'warning' | 'info';
  content: React.ReactNode;
}) => {
  return (
    <div className={`bg-accent px-4 py-2 my-2 rounded-lg ${type === 'error' ? 'text-red-500' : ''}`}>
      {type === 'success' ? '🎉成功了！' : '🙅出错了：'}
      {content}
    </div>
  );
};
export const DisplayServerActionResponse = ({ result }: Props) => {
  const { data, serverError, validationErrors } = result;

  return (
    <div>
      {data?.message && <MessageBox type="success" content={`Success  ${data.message}`} />}
      {serverError && <MessageBox type="error" content={`Error  ${serverError}`} />}
      {validationErrors && (
        <MessageBox
          type="error"
          content={Object.keys(validationErrors).map((key) => (
            <p key={key}> {`${key}: ${validationErrors[key as keyof typeof validationErrors]}`}</p>
          ))}
        />
      )}
    </div>
  );
};

