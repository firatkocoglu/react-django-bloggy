/* eslint react/prop-types: 0 */

import Markdown from 'react-markdown';

const Preview = ({ fields }) => {
  const { title, content } = fields;

  return (
    <section className='preview-section'>
      <div className='preview-editor'>
        <div className='preview-heading'>
          <h1>Preview your post</h1>
        </div>
        <div className='preview-post'>
          <div className='post-title'>
            <h1>{title}</h1>
          </div>
          <div className='post-content'>
            <Markdown>{content}</Markdown>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preview;
