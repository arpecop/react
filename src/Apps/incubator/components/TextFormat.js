import React from 'react';
import {
  Tag,
} from 'antd';

const uuid = require('uuid/v4');

const TextFormat = ({ text }) => {
  if (text) {
    const arr = text.split(' ').map((word) => {
      if (word.substring(0, 1) === '#') {
        return { type: 'tag', word, key: uuid() };
      }
      if (word.substring(0, 3) === 'http') {
        return { type: 'url', word: 'xxx', key: uuid() };
      }
      return { word, type: 'word', key: uuid() };
    });
    const cont = arr.map((word) => {
      if (word.type === 'url') {
        return <React.Fragment key={word.key}>dsdsxxxxx</React.Fragment>;
      }
      if (word.type === 'tag') {
        return (
          <a
            key={word.key}
            href={`/t/${word.word
              .toLowerCase()
              .replace('#', '')
              .replace('.', '')}`}
          >
            <Tag style={{
              border: 'none',
              cursor: 'pointer',
              margin: 4,
            }}
            >
              {word.word.replace('#', '')}
            </Tag>
          </a>
        );
      }
      return `${word.word} `;
    });
    return cont;
  }
  return '';
};
export default TextFormat;
