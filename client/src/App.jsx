import { useEffect, useMemo, useState } from "react";
import "./App.css";

const initialForm = {
  company: "",
  position: "",
  location: "",
  status: "Applied",
  appliedDate: "",
  jobType: "Full-time",
  jobUrl: "",
  notes: "",
};

function App() {
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/applications");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch applications");
      }

      setApplications(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.company.trim() || !form.position.trim()) {
      setError("Company name and job position are required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const url = editingId
        ? `/api/applications/${editingId}`
        : "/api/applications";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          appliedDate: form.appliedDate || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Request failed");
      }

      if (editingId) {
        setApplications((previous) =>
          previous.map((application) =>
            application._id === editingId ? result.data : application
          )
        );
      } else {
        setApplications((previous) => [result.data, ...previous]);
      }

      setForm(initialForm);
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (application) => {
    setEditingId(application._id);

    setForm({
      company: application.company || "",
      position: application.position || "",
      location: application.location || "",
      status: application.status || "Applied",
      appliedDate: application.appliedDate
        ? application.appliedDate.slice(0, 10)
        : "",
      jobType: application.jobType || "Full-time",
      jobUrl: application.jobUrl || "",
      notes: application.notes || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(initialForm);
    setError("");
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) return;

    try {
      setError("");

      const response = await fetch(`/api/applications/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete application");
      }

      setApplications((previous) =>
        previous.filter((application) => application._id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        application.company.toLowerCase().includes(searchText) ||
        application.position.toLowerCase().includes(searchText) ||
        application.location.toLowerCase().includes(searchText);

      const matchesStatus =
        filterStatus === "All" || application.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, filterStatus]);

  const interviewCount = applications.filter(
    (item) => item.status === "Interview"
  ).length;

  const selectedCount = applications.filter(
    (item) => item.status === "Selected"
  ).length;

  const rejectedCount = applications.filter(
    (item) => item.status === "Rejected"
  ).length;

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Job Application Tracker</h1>
          <p>Track your job applications in one place.</p>
        </div>

        <div className="stats">
          <div className="stat">
            <strong>{applications.length}</strong>
            <span>Total</span>
          </div>

          <div className="stat">
            <strong>{interviewCount}</strong>
            <span>Interviews</span>
          </div>

          <div className="stat">
            <strong>{selectedCount}</strong>
            <span>Selected</span>
          </div>

          <div className="stat">
            <strong>{rejectedCount}</strong>
            <span>Rejected</span>
          </div>
        </div>
      </header>

      {error && <div className="error">{error}</div>}

      <main className="content">
        <section className="card">
          <h2>{editingId ? "Edit Job Application" : "Add Job Application"}</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input
                name="company"
                placeholder="Company name *"
                value={form.company}
                onChange={handleChange}
              />

              <input
                name="position"
                placeholder="Job position *"
                value={form.position}
                onChange={handleChange}
              />

              <input
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
              />

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>

              <input
                type="date"
                name="appliedDate"
                value={form.appliedDate}
                onChange={handleChange}
              />

              <select
                name="jobType"
                value={form.jobType}
                onChange={handleChange}
              >
                <option value="Full-time">Full-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Part-time">Part-time</option>
              </select>

              <input
                name="jobUrl"
                placeholder="Job URL"
                value={form.jobUrl}
                onChange={handleChange}
              />

              <textarea
                name="notes"
                placeholder="Notes"
                value={form.notes}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <div className="form-actions">
              <button type="submit" disabled={saving}>
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Application"
                    : "Add Application"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="cancel"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="card">
          <div className="section-header">
            <h2>Applications</h2>
            <span>{filteredApplications.length} application(s)</span>
          </div>

          <div className="filters">
            <input
              placeholder="Search company, position or location..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              value={filterStatus}
              onChange={(event) => setFilterStatus(event.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {loading ? (
            <p>Loading applications...</p>
          ) : filteredApplications.length === 0 ? (
            <div className="empty">
              <h3>No applications found</h3>
              <p>Try adding an application or changing your filters.</p>
            </div>
          ) : (
            <div className="application-list">
              {filteredApplications.map((application) => (
                <article className="application" key={application._id}>
                  <div>
                    <h3>{application.position}</h3>

                    <p>
                      <strong>{application.company}</strong>
                      {application.location
                        ? ` • ${application.location}`
                        : ""}
                    </p>

                    {application.appliedDate && (
                      <small>
                        Applied:{" "}
                        {new Date(application.appliedDate).toLocaleDateString()}
                      </small>
                    )}
                  </div>

                  <div className="application-meta">
                    <span
                      className={`status ${application.status.toLowerCase()}`}
                    >
                      {application.status}
                    </span>

                    <span>{application.jobType}</span>

                    <button
                      type="button"
                      className="edit"
                      onClick={() => handleEdit(application)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete"
                      onClick={() => handleDelete(application._id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;