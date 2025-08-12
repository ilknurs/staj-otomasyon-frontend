import { useEffect, useState } from 'react';
import { fetchAttendance } from '../../services/studentService';

export default function AttendanceView() {
  const [att, setAtt] = useState([]);
  useEffect(()=>{
    fetchAttendance().then(r=>setAtt(r));
  }, []);
  return (
    <div>
      <h2 className="text-xl mb-4">Devam Bilgilerim</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Tarih</th>
            <th>İşyeri</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          {att.map((d,i)=>(
            <tr key={i} className="hover:bg-gray-50">
              <td className="p-2 border">{d.date}</td>
              <td className="p-2 border">{d.companyName}</td>
              <td className="p-2 border">{d.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
