import jsPDF from "jspdf";

export function generatePDF(resumeData: any, fileName: string = "resume.pdf") {
  try {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const maxWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    const lineHeight = 5;
    const sectionSpacing = 8;

    // Helper function to add text with line wrapping
    const addWrappedText = (text: string, size: number, isBold: boolean = false) => {
      doc.setFontSize(size);
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach((line: string) => {
        if (yPosition > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
    };

    // Header: Name and Title
    if (resumeData.name) {
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text(resumeData.name, margin, yPosition);
      yPosition += 8;
    }

    if (resumeData.title) {
      addWrappedText(resumeData.title, 12, true);
      yPosition += 2;
    }

    // Contact Information
    if (resumeData.email || resumeData.phone || resumeData.location) {
      const contactInfo = [
        resumeData.email && `Email: ${resumeData.email}`,
        resumeData.phone && `Phone: ${resumeData.phone}`,
        resumeData.location && `Location: ${resumeData.location}`
      ].filter(Boolean).join(" | ");

      addWrappedText(contactInfo, 9);
      yPosition += sectionSpacing;
    }

    // Divider
    doc.setDrawColor(180, 180, 180);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += sectionSpacing;

    // Experience Section
    if (resumeData.experience && resumeData.experience.length > 0) {
      addWrappedText("EXPERIENCE", 11, true);
      yPosition += 4;

      resumeData.experience.forEach((exp: string, index: number) => {
        if (index > 0) yPosition += 2;
        addWrappedText(exp, 10);
        yPosition += 2;
      });

      yPosition += sectionSpacing;
    }

    // Skills Section
    if (resumeData.skills && resumeData.skills.length > 0) {
      addWrappedText("SKILLS", 11, true);
      yPosition += 4;

      const skillsText = resumeData.skills.join(", ");
      addWrappedText(skillsText, 10);
      yPosition += sectionSpacing;
    }

    // Save the PDF
    doc.save(fileName);
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return false;
  }
}
