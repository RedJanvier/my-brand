ClassicEditor.create(document.querySelector('#editor'), {
  toolbar: {
    items: ['heading', 'bold', 'italic', 'link', 'codeBlock', 'table', 'undo'],
  },
  codeBlock: {
    languages: [
      { language: 'javascript', label: 'JavaScript' },
      { language: 'typescript', label: 'TypeScript' },
      { language: 'c', label: 'C' },
      { language: 'cpp', label: 'C++' },
      { language: 'css', label: 'CSS' },
      { language: 'html', label: 'HTML' },
      { language: 'java', label: 'Java' },
    ],
  },
}).catch((error) => {
  console.error(error);
});
