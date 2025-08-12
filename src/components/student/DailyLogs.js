import { useEffect, useState } from 'react';
import { fetchAssignments, fetchLogs, addLog } from '../../services/studentService';

export default function DailyLogs() {
  const [assigns, setAssigns] = useState([]);
  const [selAssign, setSelAssign] = useState('');
  const [logs, setLogs]       = useState([]);
  const [entry, setEntry]     = useState({ date:'', desc:'' });

  useEffect(()=>{
    fetchAssignments().then(r=>{
      setAssigns(r);
      if (r[0]) setSelAssign(r[0]._id);
    });
  }, []);

  useEffect(()=>{
    if (selAssign) fetchLogs(selAssign).then(r=>setLogs(r));
  }, [selAssign]);

  const save = () => {
    addLog(selAssign, entry)
      .then(()=>fetchLogs(selAssign).then(setLogs));
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Eğitim Günlüğü</h2>
      <div className="mb-4">
        <label>Staj Dönemi:</label>
        <select 
          value={selAssign}
          onChange={e=>setSelAssign(e.target.value)}
          className="border p-1 ml-2"
        >
          {assigns.map(a=>(
            <option key={a._id} value={a._id}>{a.periodName}</option>
          ))}
        </select>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label>Tarih:</label>
          <input type="date" value={entry.date}
                 onChange={e=>setEntry({...entry, date:e.target.value})}
                 className="border p-1 w-full"/>
        </div>
        <div>
          <label>Açıklama:</label>
          <textarea value={entry.desc}
                    onChange={e=>setEntry({...entry, desc:e.target.value})}
                    className="border p-1 w-full"/>
        </div>
      </div>
      <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded">
        Ekle / Güncelle
      </button>

      <ul className="mt-6 space-y-2">
        {logs.map(l=>(
          <li key={l._id} className="border p-2">
            <strong>{l.date}</strong>: {l.desc}
          </li>
        ))}
      </ul>
    </div>
  );
}
