import { CopyOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SyntaxHighlighter from 'react-syntax-highlighter';
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';

type tProps = {
  codeString?: string;
  language: 'txt' | 'javascript' | 'java' | 'axios' | undefined | string;
  showLineNumbers?: boolean;
};

const CodeHighlighting = (props: tProps) => {
  const { codeString, showLineNumbers = true, language = 'txt' } = props;
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = () => {
    message.success('已复制到粘贴板');
  };
  // @ts-ignore
  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setTimeout(() => {
          setIsHovered(false);
        }, 400);
      }}
    >
      {isHovered && (
        // @ts-ignore
        <CopyToClipboard text={codeString} onCopy={handleCopy}>
          <CopyOutlined
            style={{
              position: 'absolute',
              top: '10px',
              right: '15px',
              cursor: 'pointer',
              fontSize: '20px',
              zIndex: '1'
            }}
          />
        </CopyToClipboard>
      )}
      <SyntaxHighlighter
        showLineNumbers={showLineNumbers}
        PreTag="div"
        language={language}
        lineNumberStyle={{ fontSize: 10 }}
        style={docco}
      >
        {String(codeString).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeHighlighting;
