import Layout from '../components/layout';
import { useState } from 'react';
import ResumeTemplate from '../components/resumeTemplate';
import utilStyles from '../styles/utils.module.scss';

export default function Resume() {
  const [pretty, setPretty] = useState(false);

  return (
    <Layout>
      <button className={utilStyles.noPrint} onClick={() => setPretty(!pretty)}>toggle pretty</button>
      <ResumeTemplate pretty={pretty} />
      <a className={utilStyles.noPrint} href='/assets/Roberto-Andrade_Creative-Technologist.pdf'>Download PDF</a>
    </Layout>
  )
}