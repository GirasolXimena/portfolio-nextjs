import Layout from '../components/layout';
import { useState } from 'react';
import ResumeTemplate from '../components/resumeTemplate';
import { downloadResume } from '../lib/pdf';

export default function Resume() {
  const [pretty, setPretty] = useState(false);

  const togglePretty = () => {
    console.log('toggling pretty', pretty);
    setPretty(!pretty);
  }

  return (
    <Layout>
      <button onClick={togglePretty}>toggle pretty</button>
      <ResumeTemplate pretty={pretty} />
      <button onClick={downloadResume}>create pdf</button><br />
      <a href='/assets/Roberto-Andrade_Creative-Technologist.pdf' className="download-link">Download PDF</a>
    </Layout>
  )
}