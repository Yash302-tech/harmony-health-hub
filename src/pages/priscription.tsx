import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { auth, db } from "@/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import html2pdf from "html2pdf.js";

const Prescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selected, setSelected] = useState(null);

  // ✅ FETCH COMPLETED (DOCTOR REVIEWED)
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "consultations"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: any[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const completed = data.filter(
        (item) =>
          item.userId === user.uid &&
          item.doctorCompleted === true
      );

      setPrescriptions(completed);
    });

    return () => unsubscribe();
  }, []);

  // ✅ PDF DOWNLOAD
  const downloadPDF = () => {
    const element = document.getElementById("prescription-content");

    html2pdf()
      .set({
        margin: 10,
        filename: "prescription.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            My Prescriptions
          </h1>
          <p className="text-muted-foreground mt-1">
            Doctor reviewed consultations
          </p>
        </div>

        {/* LIST */}
        {prescriptions.length === 0 ? (
          <p className="text-muted-foreground">
            No prescriptions available
          </p>
        ) : (
          <div className="space-y-4">
            {prescriptions.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setSelected(item)}
                className="bg-card border border-border p-5 rounded-xl cursor-pointer hover:shadow-md transition"
              >
                <p className="font-semibold">
                  Consultation #{index + 1}
                </p>

                <p className="text-sm text-muted-foreground mt-1">
                  Problem: {item.problem || "N/A"}
                </p>

                <p className="text-sm text-muted-foreground">
                  Started:{" "}
                  {item.startedAt
                    ? new Date(
                        item.startedAt.seconds * 1000
                      ).toLocaleString()
                    : "N/A"}
                </p>

                <p className="text-sm text-green-600">
                  Reviewed by doctor
                </p>
              </div>
            ))}
          </div>
        )}

        {/* MODAL */}
        {selected && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[600px] max-h-[90vh] overflow-y-auto rounded-xl p-6">

              {/* PRESCRIPTION CONTENT */}
              <div id="prescription-content">
               <div id="prescription-content" className="bg-white text-black p-6">

  {/* HEADER */}
  <div className="text-center border-b pb-3 mb-4">
    <h2 className="text-2xl font-bold">Dr. Nandita Karmakar</h2>
    <p className="text-sm">BHMS, MD (Homeopathy)</p>
    <p className="text-sm">Bhopal, Madhya Pradesh</p>
  </div>

  {/* PATIENT INFO */}
  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
    <p><b>Patient Age:</b> {selected.formData?.age}</p>
    <p><b>Gender:</b> {selected.formData?.gender}</p>
    <p><b>Weight:</b> {selected.formData?.weight}</p>
    <p>
      <b>Date:</b>{" "}
      {selected.startedAt
        ? new Date(selected.startedAt.seconds * 1000).toLocaleDateString()
        : "N/A"}
    </p>
  </div>

  <hr className="my-3" />

  {/* PROBLEM */}
  <div className="mb-4">
    <h3 className="font-semibold text-lg">Chief Complaint</h3>
    <p className="text-sm mt-1">{selected.problem}</p>
  </div>

  {/* SYMPTOMS */}
  <div className="mb-4">
    <h3 className="font-semibold text-lg">Symptoms</h3>
    <p className="text-sm">{selected.formData?.complaint}</p>
    <p className="text-sm">Duration: {selected.formData?.duration}</p>
    <p className="text-sm">Severity: {selected.formData?.severity}</p>
  </div>

  {/* HISTORY */}
  <div className="mb-4">
    <h3 className="font-semibold text-lg">Medical History</h3>
    <p className="text-sm">Past Illness: {selected.formData?.pastIllness}</p>
    <p className="text-sm">Medications: {selected.formData?.medications}</p>
    <p className="text-sm">Family History: {selected.formData?.familyHistory}</p>
  </div>

  {/* LIFESTYLE */}
  <div className="mb-4">
    <h3 className="font-semibold text-lg">Lifestyle</h3>
    <p className="text-sm">Sleep: {selected.formData?.sleep}</p>
    <p className="text-sm">Diet: {selected.formData?.diet}</p>
    <p className="text-sm">Stress: {selected.formData?.stress}</p>
    <p className="text-sm">Emotional: {selected.formData?.emotional}</p>
  </div>

  {/* DOCTOR NOTE (PLACEHOLDER) */}
  <div className="mb-6">
    <h3 className="font-semibold text-lg">Prescription</h3>
    <p className="text-sm italic text-gray-700">
      (Doctor will provide medicines and instructions here)
    </p>
  </div>

  {/* FOOTER */}
  <div className="flex justify-between items-end mt-8">
    <div>
      <p className="text-sm text-green-700">✔ Reviewed by Doctor</p>
    </div>

    <div className="text-right">
      <p className="text-sm">___________________</p>
      <p className="text-sm font-medium">Doctor Signature</p>
    </div>
  </div>

</div>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-between mt-6">
                <Button onClick={downloadPDF}>
                  Download PDF
                </Button>

                <Button variant="outline" onClick={() => setSelected(null)}>
                  Close
                </Button>
              </div>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default Prescription;