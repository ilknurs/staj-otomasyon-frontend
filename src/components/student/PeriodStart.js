import { useEffect, useState } from 'react';
import { fetchAssignments, setAssignmentType } from '../../services/studentService';

export default function PeriodStart() {
  const [assigns, setAssigns] = useState([]);
  const [sel, setSel] = useState(null);
  const [type, setType] = useState('');

  useEffect(()=>{
    fetchAssignments().then(r=>{
      setAssigns(r);
      if (r[0]) {
        setSel(r[0]._id);
        setType(r[0].type||'');
      }
    });
  }, []);

  const save = () => {
    setAssignmentType(sel, type)
      .then(()=>alert('Kaydedildi'))
      .catch(console.error);
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Aktif Staj Dönemi Bilgisi</h2>
      {assigns.length === 0
        ? <p>Önceki staj eğitimi bilgisi bulunmamaktadır.</p>
        : <p>
            Önceki dönem: <strong>{assigns[0].periodName}</strong>
          </p>
      }
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <label>Staj Dönemi:</label>
          <select 
            value={sel||''}
            onChange={e=>setSel(e.target.value)}
            className="border p-1 w-full"
          >
            {assigns.map(a=>(
              <option key={a._id} value={a._id}>{a.periodName}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Dönem Bilgisi:</label>
          <select 
            value={type}
            onChange={e=>setType(e.target.value)}
            className="border p-1 w-full"
          >
            <option value="">Seçiniz</option>
            <option value="STAJ1">Staj1</option>
            <option value="STAJ2">Staj2</option>
            <option value="BOTH">Staj1 ve Staj2</option>
          </select>
        </div>
      </div>
      <button onClick={save} className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded">
        Kaydet
      </button>
    </div>
  );
}
