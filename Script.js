function generateCV() {
    // Capture form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const summary = document.getElementById('summary').value;
    const experience = document.getElementById('experience').value;
    const experience_2 = document.getElementById('experience-2').value;
    const experience_3 = document.getElementById('experience-3').value;
    const education = document.getElementById('education').value;
    const education_2 = document.getElementById('education-2').value;
    const education_3 = document.getElementById('education-3').value;
    const education_4 = document.getElementById('education-4').value;
    const education_5 = document.getElementById('education-5').value;
    const skills = document.getElementById('skills').value;
    const skills_2 = document.getElementById('skills-2').value;
    const skills_3 = document.getElementById('skills-3').value;
    const skills_4 = document.getElementById('skills-4').value;
    const skills_5 = document.getElementById('skills-5').value;
    const picture = document.getElementById('picture').files[0];

    // Generate CV HTML
    const reader = new FileReader();
    reader.onload = function (e) {
        const pictureUrl = e.target.result;

        // Build HTML conditionally based on non-empty fields
        const cvHtml = `
            <div class="cv-picture">
                <img src="${pictureUrl}" alt="Profile Picture">
            </div>
            <div class="cv-section">
                ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
                ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
                ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                ${address ? `<p><strong>Address:</strong> ${address}</p>` : ''}
            </div>
            <div class="cv-section">
                ${summary ? `<h2>Summary</h2><p>${summary}</p>` : ''}
            </div>
            <div class="cv-section">
                ${experience || experience_2 || experience_3 ? '<h2>Experience</h2>' : ''}
                ${experience ? `<p>${experience}</p>` : ''}
                ${experience_2 ? `<p>${experience_2}</p>` : ''}
                ${experience_3 ? `<p>${experience_3}</p>` : ''}
            </div>
            <div class="cv-section">
                ${education || education_2 || education_3 || education_4 || education_5 ? '<h2>Education</h2>' : ''}
                ${education ? `<p>${education}</p>` : ''}
                ${education_2 ? `<p>${education_2}</p>` : ''}
                ${education_3 ? `<p>${education_3}</p>` : ''}
                ${education_4 ? `<p>${education_4}</p>` : ''}
                ${education_5 ? `<p>${education_5}</p>` : ''}
            </div>
            <div class="cv-section">
                ${skills || skills_2 || skills_3 || skills_4 || skills_5 ? '<h2>Skills</h2>' : ''}
                ${skills ? `<p>${skills}</p>` : ''}
                ${skills_2 ? `<p>${skills_2}</p>` : ''}
                ${skills_3 ? `<p>${skills_3}</p>` : ''}
                ${skills_4 ? `<p>${skills_4}</p>` : ''}
                ${skills_5 ? `<p>${skills_5}</p>` : ''}
            </div>
        `;

        // Display generated CV
        document.getElementById('cv-result').innerHTML = cvHtml;
        document.getElementById('save-pdf').style.display = 'block';
         document.getElementById('save-html').style.display = 'block';
          document.getElementById('save-image').style.display = 'block';
    };

    if (picture) {
        reader.readAsDataURL(picture);
    } else {
        alert('Please upload a picture');
    }
}
/*
function saveCV() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'pt', 'a4');

    const cvContent = document.getElementById('cv-result');

    doc.html(cvContent, {
        callback: function (doc) {
            doc.save('CV.pdf');
        },
        x: 20,
        y: 20,
        width: 500,
        windowWidth: 800
    });
*/
/*
  function saveCV()
{
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('p', 'mm', 'a4');

            const cvElement = document.getElementById('cv-result');

            html2canvas(cvElement).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = 210;
                const pageHeight = 295;
                const imgHeight = canvas.height * imgWidth / canvas.width;
                let heightLeft = imgHeight;
                let position = 0;

                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft > 0) {
                    position = heightLeft - imgHeight;
                    doc.addPage();
                    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                doc.save('CV.pdf');
            });
}
*/


                           // CV In Html Form//
/*
function saveCV() {
    const cvContent = document.getElementById('cv-result').innerHTML;
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My CV</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    background-color: #f4f4f4;
                }
                .cv-section {
                    margin-bottom: 20px;
                }
                .cv-section h2 {
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 5px;
                    margin-bottom: 10px;
                }
                .cv-picture {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .cv-picture img {
                    max-width: 150px;
                    border-radius: 50%;
                }
            </style>
        </head>
        <body>
            ${cvContent}
        </body>
        </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'MyCV.html';
    link.click();
}
*/

     async function savePDF() {
    const cvResult = document.getElementById('cv-result');
    if (!cvResult) {
        console.error('Element with id "cv-result" not found.');
        return;
    }

    // Capture the content as an image
    html2canvas(cvResult).then(canvas => {
        const imgData = canvas.toDataURL('image/png');

        // Create a new jsPDF instance
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        // Add image to PDF
        const imgWidth = 190; // PDF width minus margins
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Save the PDF
        pdf.save('CV.pdf');
    }).catch(error => {
        console.error('Error generating PDF:', error);
    });
}

    function saveHTML() {
            const cvContent = document.getElementById('cv-result').innerHTML;
            const htmlContent = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>My CV</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                            background-color: #f4f4f4;
                        }
                        .cv-section {
                            margin-bottom: 20px;
                        }
                        .cv-section h2 {
                            border-bottom: 1px solid #ddd;
                            padding-bottom: 5px;
                            margin-bottom: 10px;
                        }
                        .cv-picture {
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        .cv-picture img {
                            max-width: 150px;
                            border-radius: 50%;
                        }
                    </style>
                </head>
                <body>
                    ${cvContent}
                </body>
                </html>
            `;
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'CV.html';
            link.click();
        }

 function saveImage() {
    const cvResult = document.getElementById('cv-result');
    if (!cvResult) {
        console.error('Element with id "cv-result" not found.');
        return;
    }

    html2canvas(cvResult).then(canvas => {
        if (!canvas) {
            console.error('Failed to create canvas.');
            return;
        }

        const imgData = canvas.toDataURL('image/png');
        if (!imgData) {
            console.error('Failed to get image data from canvas.');
            return;
        }

        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'CV.png';
        document.body.appendChild(link); // Append link to body
        link.click();
        document.body.removeChild(link); // Remove link from body
    }).catch(error => {
        console.error('Error generating image:', error);
    });
}