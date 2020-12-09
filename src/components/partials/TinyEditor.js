import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default class TinyEditor extends Component {
    render() {
        const {description, handleEditorChange} = this.props;

        return (
            <Editor
                initialValue={description}
                value={description}
                init={{
                height: 300,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                    // eslint-disable-next-line no-multi-str
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist | link image media | removeformat | help'
                }}
                onEditorChange={handleEditorChange}
                required
            />
        )
    }
}
