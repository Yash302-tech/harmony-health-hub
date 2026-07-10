import { useEffect, useMemo, useState } from "react";
import { Eye, FileText, X } from "lucide-react";

import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import DoctorSidebar from "../components/DoctorSidebar";
import Topbar from "../doctorDashboard/components/Topbar";

import "../test/ConsultationsDoctor.css";

const FILTERS = ["all", "pending", "completed"];

const formatDate = (value) => {
  if (!value) return "Date not available";

  if (typeof value?.toDate === "function") {
    return value.toDate().toLocaleDateString();
  }

  if (typeof value?.seconds === "number") {
    return new Date(value.seconds * 1000).toLocaleDateString();
  }

  if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) return d.toLocaleDateString();
    return String(value);
  }

  return "Date not available";
};

const getTimeValue = (value) => {
  if (!value) return 0;

  if (typeof value?.toDate === "function") {
    return value.toDate().getTime();
  }

  if (typeof value?.seconds === "number") {
    return value.seconds * 1000;
  }

  if (typeof value === "number") return value;

  if (typeof value === "string") {
    const t = new Date(value).getTime();
    return Number.isNaN(t) ? 0 : t;
  }

  return 0;
};

export default function ConsultationsDoctor() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const [prescriptionForm, setPrescriptionForm] = useState({
    medicineCount: "",
    medicines: "",
    dosage: "",
    timesPerDay: "",
    duration: "",
    precautions: "",
    notes: "",
  });

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const [usersSnap, consultationSnap] = await Promise.all([
          getDocs(collection(db, "users")),
          getDocs(collection(db, "consultations")),
        ]);

        const usersMap = {};

        usersSnap.docs.forEach((u) => {
          const data = u.data();
          const userName =
            data.name ||
            data.fullName ||
            data.displayName ||
            "Patient";

          usersMap[u.id] = userName;
          if (data.uid) usersMap[data.uid] = userName;
        });

        const data = consultationSnap.docs
          .map((d) => {
            const raw = d.data();
            const formData = raw.formData || {};

            const uid =
              raw.uid ||
              raw.userId ||
              raw.patientId ||
              formData.uid ||
              formData.userId ||
              formData.patientId ||
              "";

            const name =
              raw.userName ||
              raw.name ||
              formData.name ||
              formData.patientName ||
              formData.fullName ||
              usersMap[uid] ||
              "Patient";

            const problem =
              raw.problem ||
              raw.complaint ||
              formData.problem ||
              formData.complaint ||
              formData.symptoms ||
              "Problem not available";

            const statusRaw = raw.status || (raw.doctorCompleted ? "completed" : "pending");
            const status =
              String(statusRaw).toLowerCase() === "completed"
                ? "completed"
                : "pending";

            const prescribed = Boolean(
              raw.prescription || raw.prescribedAt || raw.doctorCompleted
            );

            const sortTime = Math.max(
              getTimeValue(raw.createdAt),
              getTimeValue(raw.startedAt),
              getTimeValue(formData.startedAt)
            );

            return {
              id: d.id,
              name,
              problem,
              age: formData.age || "—",
              gender: formData.gender || "—",
              weight: formData.weight || "—",
              severity: formData.severity || "—",
              duration: formData.duration || "—",
              occupation: formData.occupation || "—",
              familyHistory: formData.familyHistory || "—",
              pastIllness: formData.pastIllness || "—",
              medications: formData.medications || "—",
              dateText: formatDate(raw.createdAt || raw.startedAt || formData.startedAt),
              status,
              prescribed,
              prescription: raw.prescription || null,
              sortTime,
              uid,
            };
          })
          .sort((a, b) => b.sortTime - a.sortTime);

        setConsultations(data);
      } catch (error) {
        console.log("Consultations Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  const filteredConsultations = useMemo(() => {
    if (activeTab === "pending") {
      return consultations.filter((c) => c.status === "pending");
    }
    if (activeTab === "completed") {
      return consultations.filter((c) => c.status === "completed");
    }
    return consultations;
  }, [consultations, activeTab]);

  const counts = useMemo(() => {
    return {
      all: consultations.length,
      pending: consultations.filter((c) => c.status === "pending").length,
      completed: consultations.filter((c) => c.status === "completed").length,
    };
  }, [consultations]);

  const openDetail = (consultation) => {
    setSelectedConsultation(consultation);
    setShowDetailModal(true);
  };

  const openPrescription = (consultation) => {
    setSelectedConsultation(consultation);
    setPrescriptionForm({
      medicineCount: consultation?.prescription?.medicineCount || "",
      medicines: consultation?.prescription?.medicines || "",
      dosage: consultation?.prescription?.dosage || "",
      timesPerDay: consultation?.prescription?.timesPerDay || "",
      duration: consultation?.prescription?.duration || "",
      precautions: consultation?.prescription?.precautions || "",
      notes: consultation?.prescription?.notes || "",
    });
    setShowPrescriptionModal(true);
  };

  const closeModals = () => {
    setShowDetailModal(false);
    setShowPrescriptionModal(false);
    setSelectedConsultation(null);
  };

  const handlePrescriptionChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCompletePrescription = async (e) => {
    e.preventDefault();

    if (!selectedConsultation) return;

    try {
      const prescriptionPayload = {
        medicineCount: prescriptionForm.medicineCount,
        medicines: prescriptionForm.medicines,
        dosage: prescriptionForm.dosage,
        timesPerDay: prescriptionForm.timesPerDay,
        duration: prescriptionForm.duration,
        precautions: prescriptionForm.precautions,
        notes: prescriptionForm.notes,
        createdAt: serverTimestamp(),
      };

      await updateDoc(doc(db, "consultations", selectedConsultation.id), {
        status: "completed",
        doctorCompleted: true,
        prescription: prescriptionPayload,
        prescribedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setConsultations((prev) =>
        prev.map((item) =>
          item.id === selectedConsultation.id
            ? {
                ...item,
                status: "completed",
                prescribed: true,
                prescription: prescriptionPayload,
              }
            : item
        )
      );

      setShowPrescriptionModal(false);
      setSelectedConsultation(null);
    } catch (error) {
      console.log("Prescription update error:", error);
    }
  };

  return (
    <div className="doctor-dashboard-layout">
      <DoctorSidebar />

      <div className="doctor-dashboard-content">
        <Topbar
          title="Consultations"
          subtitle="All consultation requests from patients."
        />

        <div className="app-content consultations-page-shell">
          <div className="card consultations-card">
            <div className="consultations-tabs">
              {FILTERS.map((tab) => (
                <button
                  key={tab}
                  className={
                    activeTab === tab
                      ? "consultation-tab-btn active"
                      : "consultation-tab-btn"
                  }
                  onClick={() => setActiveTab(tab)}
                >
                  <span style={{ textTransform: "capitalize" }}>{tab}</span>
                  <span className="tab-count">{counts[tab]}</span>
                </button>
              ))}
            </div>

            <div className="consultations-scroll">
              {loading ? (
                <div className="loading-block">Loading consultations…</div>
              ) : filteredConsultations.length === 0 ? (
                <div className="empty-block">No consultations match this view.</div>
              ) : (
                filteredConsultations.map((c) => (
                  <div className="consultation-card" key={c.id}>
                    <div className="consultation-card-top">
                      <div className="consultation-head-left">
                        <div className="consultation-name">{c.name}</div>
                        <div className="consultation-date">{c.dateText}</div>
                      </div>

                      <div className="badge-row">
                        <span
                          className={
                            c.status === "completed"
                              ? "status-badge completed"
                              : "status-badge pending"
                          }
                        >
                          {c.status === "completed" ? "Completed" : "Pending"}
                        </span>

                        <span
                          className={
                            c.prescribed
                              ? "prescription-badge prescribed"
                              : "prescription-badge not-prescribed"
                          }
                        >
                          {c.prescribed ? "Prescribed" : "Not prescribed"}
                        </span>
                      </div>
                    </div>

                    <div className="consultation-meta-grid">
                      <div className="meta-chip">
                        <div className="meta-label">Age</div>
                        <div className="meta-value">{c.age}</div>
                      </div>

                      <div className="meta-chip">
                        <div className="meta-label">Weight</div>
                        <div className="meta-value">{c.weight}</div>
                      </div>

                      <div className="meta-chip">
                        <div className="meta-label">Severity</div>
                        <div className="meta-value">{c.severity}</div>
                      </div>

                      <div className="meta-chip">
                        <div className="meta-label">Duration</div>
                        <div className="meta-value">{c.duration}</div>
                      </div>
                    </div>

                    <div className="consultation-problem">
                      <span className="problem-label">Problem:</span> {c.problem}
                    </div>

                    <div className="consultation-actions">
                      <button
                        className="consultation-button consultation-button-secondary"
                        onClick={() => openDetail(c)}
                      >
                        <Eye size={16} />
                        View Detail
                      </button>

                      {c.status === "pending" && (
                        <button
                          className="consultation-button consultation-button-primary"
                          onClick={() => openPrescription(c)}
                        >
                          <FileText size={16} />
                          Prescribe
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {showDetailModal && selectedConsultation && (
        <div className="consultations-modal-overlay" onClick={closeModals}>
          <div className="consultations-modal" onClick={(e) => e.stopPropagation()}>
            <div className="consultations-modal-header">
              <div>
                <div className="modal-title">{selectedConsultation.name}</div>
                <div className="modal-subtitle">{selectedConsultation.dateText}</div>
              </div>

              <button className="modal-close-btn" onClick={closeModals}>
                <X size={18} />
              </button>
            </div>

            <div className="consultations-modal-body">
              <div className="consultation-detail-grid">
                <div className="detail-box">
                  <label>Age</label>
                  <div>{selectedConsultation.age}</div>
                </div>

                <div className="detail-box">
                  <label>Gender</label>
                  <div>{selectedConsultation.gender}</div>
                </div>

                <div className="detail-box">
                  <label>Weight</label>
                  <div>{selectedConsultation.weight}</div>
                </div>

                <div className="detail-box">
                  <label>Severity</label>
                  <div>{selectedConsultation.severity}</div>
                </div>

                <div className="detail-box">
                  <label>Duration</label>
                  <div>{selectedConsultation.duration}</div>
                </div>

                <div className="detail-box">
                  <label>Occupation</label>
                  <div>{selectedConsultation.occupation}</div>
                </div>

                <div className="detail-box">
                  <label>Family History</label>
                  <div>{selectedConsultation.familyHistory}</div>
                </div>

                <div className="detail-box">
                  <label>Past Illness</label>
                  <div>{selectedConsultation.pastIllness}</div>
                </div>

                <div className="detail-box">
                  <label>Medications</label>
                  <div>{selectedConsultation.medications}</div>
                </div>

                <div className="detail-box">
                  <label>Status</label>
                  <div>{selectedConsultation.status}</div>
                </div>
              </div>

              <div className="detail-box full-width-box">
                <label>Problem / Complaint</label>
                <div>{selectedConsultation.problem}</div>
              </div>

              {selectedConsultation.prescription && (
                <div className="detail-box full-width-box">
                  <label>Prescription</label>
                  <div className="prescription-view">
                    {typeof selectedConsultation.prescription === "object"
                      ? Object.entries(selectedConsultation.prescription).map(([key, value]) => (
                          <div key={key} className="prescription-line">
                            <strong>{key}:</strong> {String(value)}
                          </div>
                        ))
                      : String(selectedConsultation.prescription)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showPrescriptionModal && selectedConsultation && (
        <div className="consultations-modal-overlay" onClick={closeModals}>
          <div className="consultations-modal prescription-modal" onClick={(e) => e.stopPropagation()}>
            <div className="consultations-modal-header">
              <div>
                <div className="modal-title">Prescribe - {selectedConsultation.name}</div>
                <div className="modal-subtitle">{selectedConsultation.problem}</div>
              </div>

              <button className="modal-close-btn" onClick={closeModals}>
                <X size={18} />
              </button>
            </div>

            <form className="consultations-modal-body" onSubmit={handleCompletePrescription}>
              <div className="prescription-form">
                <div className="form-field">
                  <label>No. of medicines</label>
                  <input
                    className="input"
                    type="text"
                    name="medicineCount"
                    value={prescriptionForm.medicineCount}
                    onChange={handlePrescriptionChange}
                    placeholder="Example: 2"
                  />
                </div>

                <div className="form-field full-width">
                  <label>Medicine names</label>
                  <textarea
                    className="textarea"
                    name="medicines"
                    value={prescriptionForm.medicines}
                    onChange={handlePrescriptionChange}
                    placeholder="Write medicine names one by one"
                  />
                </div>

                <div className="form-field">
                  <label>Dosage</label>
                  <input
                    className="input"
                    type="text"
                    name="dosage"
                    value={prescriptionForm.dosage}
                    onChange={handlePrescriptionChange}
                    placeholder="Example: 1 tablet"
                  />
                </div>

                <div className="form-field">
                  <label>Times per day</label>
                  <input
                    className="input"
                    type="text"
                    name="timesPerDay"
                    value={prescriptionForm.timesPerDay}
                    onChange={handlePrescriptionChange}
                    placeholder="Example: 2 times"
                  />
                </div>

                <div className="form-field">
                  <label>Duration</label>
                  <input
                    className="input"
                    type="text"
                    name="duration"
                    value={prescriptionForm.duration}
                    onChange={handlePrescriptionChange}
                    placeholder="Example: 7 days"
                  />
                </div>

                <div className="form-field full-width">
                  <label>Precautions</label>
                  <textarea
                    className="textarea"
                    name="precautions"
                    value={prescriptionForm.precautions}
                    onChange={handlePrescriptionChange}
                    placeholder="Precautions, food restrictions, rest, etc."
                  />
                </div>

                <div className="form-field full-width">
                  <label>Additional notes</label>
                  <textarea
                    className="textarea"
                    name="notes"
                    value={prescriptionForm.notes}
                    onChange={handlePrescriptionChange}
                    placeholder="Extra notes for the patient"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="consultation-button consultation-button-secondary" onClick={closeModals}>
                  Cancel
                </button>
                <button type="submit" className="consultation-button consultation-button-primary">
                  Complete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}