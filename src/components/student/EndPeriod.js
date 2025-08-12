import { useEffect, useState } from 'react';
import { fetchGrades } from '../../services/studentService';

export default function EndPeriod() {
  const [grades, setGrades] = useState([]);
  useEffect(()=>{
    fetchGrades().then(r=>setGrades(r));
  }, []);
  return (
    <div>
      <h2 className="text-xl mb-4">Dönem Sonu Değerlendirmem</h2>
      <table className="w-full border">
        <thead><tr className="bg-gray-100">
          <th>Dönem</th><th>Not</th><th>Rapor</th>
        </tr></thead>
        <tbody>
          {grades.map(g=>(
            <tr key={g.periodId} className="hover:bg-gray-50">
              <td className="p-2 border">{g.periodName}</td>
              <td className="p-2 border">{g.score || g.passed?'Geçti':'Kaldı'}</td>
              <td className="p-2 border">
                {g.reportUrl && (
                  <a href={g.reportUrl} target="_blank" rel="noopener noreferrer"
                     className="px-2 py-1 bg-yellow-500 text-white rounded">
                    Dosyayı Görüntüle
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
