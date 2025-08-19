import React, { useEffect, useState } from "react";

function SupervisorStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/supervisors/my-students", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // backend doğrulaması için
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStudents(data.data);
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
      <h2>Danışmanlık Yaptığınız Öğrenciler</h2>
      {students.length === 0 ? (
        <p>Henüz öğrenciniz bulunmamaktadır.</p>
      ) : (
        <ul>
          {students.map((s) => (
            <li key={s._id}>
              {s.name} {s.surname} – {s.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SupervisorStudents;
