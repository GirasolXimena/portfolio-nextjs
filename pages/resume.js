import Layout from '../components/layout';
import { useState } from 'react';
import ResumeTemplate from '../components/resumeTemplate';
import utilStyles from '../styles/utils.module.scss';
import { downloadResume } from '../lib/pdf';

export default function Resume() {
  const [pretty, setPretty] = useState(false);

  const togglePretty = () => {
    console.log('toggling pretty', pretty);
    setPretty(!pretty);
  }

  return (
    <Layout>
      <button className={utilStyles.noPrint} onClick={() => setPretty(!pretty)}>toggle pretty</button>
      <ResumeTemplate pretty={pretty} />
      <button className={utilStyles.noPrint} onClick={downloadResume}>create pdf</button><br />
      <a className={utilStyles.noPrint} href='/assets/Roberto-Andrade_Creative-Technologist.pdf'>Download PDF</a>
    </Layout>
  )
}