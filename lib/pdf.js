import { jsPDF } from 'jspdf';

export const downloadResume = () => {
  const doc = new jsPDF();
  const resume = document.getElementById('resume');
  const windowWidth = resume.clientWidth;
  doc.html(resume, {
    callback: function (doc) {
      doc.save('Roberto-Andrade_Creative-Technologist.pdf');
    },
    jsPDF: doc,
    x: 0,
    y: 0,
    // paper is 210mm wide, so scale it to fit the width of the page
    // with margins
    width: 200,
    windowWidth: windowWidth
  })
}