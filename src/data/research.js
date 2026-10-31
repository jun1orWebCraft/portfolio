export const research = [
  { id: "batanghanda-paper",
    title: "BatangHanda App: A Mobile-Based Learning Platform for Disaster Resilience and Climate Change Awareness among Children in Ligao City",
    authors: [], // EDIT
    event: "2nd National Media and Information Literacy Conference (PAMIL)", venue: "Ateneo de Naga University", date: "October 23-24", abstract: "", // EDIT: add the year and abstract
    photos: ["/images/research/paper-presentation.jpg"], slidesPdf: "", paperUrl: "" },
];
// Certificates are grouped. Add files to public/images/certificates/ and add an entry to the matching group's items.
export const certificateGroups = [
  { id: "academic", title: "Dean's List and Academic Awards", items: [
    { id: "deans-list-2024-2025", title: "Dean's Bronze Award of Excellence", issuer: "Infotech Development Systems Colleges, Inc. (BSIT)",
      date: "September 12, 2025", description: "Academic Year 2024-2025, BSIT program.", image: "/images/certificates/deans-list-2024-2025.jpg" },
  ] },
  { id: "paper", title: "Paper Presentation", items: [
    // EDIT: add your certificate, e.g. { id: "mil-2026", title: "Certificate of Presentation", issuer: "PAMIL", date: "", description: "", image: "/images/certificates/paper-presentation.jpg" }
  ] },
  { id: "leadership", title: "Leadership", items: [
    // EDIT: add your CITO / leadership certificates here
  ] },
];
