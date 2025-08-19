import React, { useEffect, useState } from "react";

function SupervisorApprovals() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/supervisors/pending-internships", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setInternships(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Onay Bekleyen Staj Başvuruları</h2>
      {internships.length === 0 ? (
        <p>Şu anda onay bekleyen başvuru yok.</p>
      ) : (
        <ul>
          {internships.map((i) => (
            <li key={i._id}>
              {i.student?.name} {i.student?.surname} - {i.student?.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SupervisorApprovals;
