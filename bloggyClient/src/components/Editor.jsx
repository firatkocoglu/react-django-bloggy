/* eslint react/prop-types: 0 */

import { useEffect } from 'react';
import { FaCode, FaRegImage, FaRegFileCode } from 'react-icons/fa';
import { FaQuoteRight, FaHeading } from 'react-icons/fa6';
import { GoItalic, GoBold } from 'react-icons/go';

export function Editor({ fields, handleFieldChanges }) {
  useEffect(() => {
    let pre_content = document.getElementById('content');
    pre_content.innerHTML = fields.content;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editorToolHandler = (e) => {
    const selection = window.getSelection();

    if (
      selection.focusNode.id === 'content' ||
      selection.focusNode.parentElement.id === 'content'
    ) {
      const { name } = e.target;
      let markdown = '';
      if (name === 'heading') {
        markdown = '# type here';
      }
      if (name === 'single-code') {
        markdown = '`type here`';
      }
      if (name === 'code-block') {
        markdown = '```\ntype here\n```\n';
      }
      if (name === 'quote') {
        markdown = '>type here';
      }
      if (name === 'bold') {
        markdown = '**type here**';
      }
      if (name === 'italic') {
        markdown = '_type here_';
      }
      const node = document.createTextNode(markdown);
      selection.getRangeAt(0).insertNode(node);
    }
  };

  return (
    <>
      <div className='editor-container'>
        <div
          className='text-editor'
          role='textbox'
          aria-multiline='true'
          title='Content'
          style={{ display: 'inline-block', width: '100%' }}
        >
          <div className='toolbar'>
            <div className='text-editor-buttons'>
              <button
                className='editor-button'
                type='button'
                name='heading'
                aria-label='Add Heading'
                onClick={editorToolHandler}
              >
                <FaHeading />
              </button>
              <button
                className='editor-button'
                type='button'
                name='single-code'
                aria-label='Add Single Code Line'
                onClick={editorToolHandler}
              >
                <FaCode />
              </button>
              <button
                className='editor-button'
                type='button'
                name='code-block'
                aria-label='Add Code Block'
                onClick={editorToolHandler}
              >
                <FaRegFileCode />
              </button>
              <button
                className='editor-button'
                type='button'
                name='quote'
                aria-label='Add Quote'
                onClick={editorToolHandler}
              >
                <FaQuoteRight />
              </button>
              <button
                className='editor-button'
                type='button'
                name='bold'
                aria-label='Bold'
                onClick={editorToolHandler}
              >
                <GoBold />
              </button>
              <button
                className='editor-button'
                type='button'
                name='italic'
                aria-label='Italic'
                onClick={editorToolHandler}
              >
                <GoItalic />
              </button>
            </div>
          </div>
          <pre
            id='content'
            onInput={handleFieldChanges}
            contentEditable='true'
          ></pre>
        </div>
      </div>
    </>
  );
}
