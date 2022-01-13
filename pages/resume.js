import Layout from '../components/layout';
import { useState } from 'react';
import ResumeTemplate from '../components/resumeTemplate';
import utilStyles from '../styles/utils.module.scss';

export default function Resume() {
  const [pretty, setPretty] = useState(true);
  const resumeUrl = `/assets/Andrade-Creative_Technologist${pretty ? '' : ' (machine)'}.pdf`

  return (
    <Layout>
      <iframe src={resumeUrl} width="900px" height="1200px">
      </iframe>

      {/* <ResumeTemplate pretty={pretty} /> */}
      <div className={utilStyles.noPrint}>
        <button onClick={() => setPretty(!pretty)}>View {pretty ? 'CV' : 'Resume'}</button>

        or
        <a href={resumeUrl}>Download PDF</a>
      </div>
    </Layout>
  )
}