/* eslint-disable react/display-name */
import Render from 'react-markdown';
import * as React from 'react/index.js';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { FaTerminal as Terminal } from 'react-icons/fa';
// import Image from 'next/image';

function MyRender({content}) {
  return (
    <Render
          components={{
            p: ({ node, children }) => {
              // if (node.children[0].tagName === 'img') {
              //   const image = node.children[0];
              //   return (
              //     <div
              //       className='image'
              //       style={{
              //         display: 'flex',
              //         alignItems: 'center',
              //         justifyContent: 'center',
              //       }}
              //       width='960'
              //       height='640'
              //     >
              //       <Image
              //         loader={() => image.properties.src}
              //         src={`${image.properties.src}`}
              //         alt={image.properties.alt}
              //         width='600'
              //         height='400'
              //       />
              //     </div>
              //   );
              // }
              return <p>{children}</p>;
            },
            code({ className, children }) {
              if (className) {
                const language = className.replace('language-', '');
                const content = children[0].toString().split('\n');
                const filename = content[0];
                content.shift();

                const Icon = ({ name }) => {
                  const extension = name.split('.')[1];
                  const icons = {
                    js: '/icons/javascript.svg',
                    json: '/icons/json.svg',
                    java: '/icons/java.svg',
                    html: '/icons/html.svg',
                    css: '/icons/css.svg',
                    md: '/icons/markdown.svg',
                    sh: '/icons/command.svg',
                    jsx: '/icons/react.svg',
                    vue: '/icons/vue.svg',
                  };
                  const result = name.match(/Command Line/i) ? (
                    <Terminal />
                  ) : (
                    <img
                      src={icons[extension] || '/icons/file.svg'}
                      alt={`${extension}-file`}
                      style={{ margin: 'auto' }}
                      width={25}
                      height={25}
                    />
                  );
                  return result;
                };

                return (
                  <>
                    <div className='code-label'>
                      <Icon name={filename} /> {filename}
                    </div>
                    <div className='code-file'>
                      <SyntaxHighlighter
                        style={nord}
                        language={language}
                        wrapLongLines
                      >
                        {content.join('\n')}
                      </SyntaxHighlighter>{' '}
                    </div>
                  </>
                );
              } else
                return (
                  <SyntaxHighlighter useInlineStyles style={nord}>
                    {children[0]}
                  </SyntaxHighlighter>
                );
            },
          }}
        >
          {content}
        </Render>
  )
}

export default MyRender