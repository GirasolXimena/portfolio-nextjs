import Layout from '../components/layout';
import { useState } from 'react';
import ResumeTemplate from '../components/resumeTemplate';
import utilStyles from '../styles/utils.module.scss';

export default function Resume() {
  const [pretty, setPretty] = useState(true);

  return (
    <Layout>
      <ResumeTemplate pretty={pretty} />
      <div className={utilStyles.noPrint}>
        <button onClick={() => setPretty(!pretty)}>View {pretty ? 'CV' : 'Resume'}</button>

        or
        <a href={`/assets/Andrade-Creative_Technologist${pretty ? '' : ' (machine)'}.pdf`}>Download PDF</a>
      </div>
    </Layout>
  )
}